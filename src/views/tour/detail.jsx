import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ArticleDetailSkeleton from "../../atoms/loadingComponent/article/detailSekeleton";
import { Button } from "flowbite-react";
import { LuRefreshCcw } from "react-icons/lu";
import TourService from "../../services/controllers/tour/tour.service";
import ThumbnailBanner from "../../atoms/ThumbnailBanner";
import { CiMap } from "react-icons/ci";
import { BiGlobe } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { FaFacebook, FaInstagram, FaLinkedin, FaThreads, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

const TourDetail = () => {
    const { slug } = useParams();
    const {
        data: tour,
        isLoading: isLoadingArticle,
        isError: isErrorArticle,
        isFetching: isFetchingArticle,
        refetch: refetchArticle,
      } = useQuery({
        queryKey: ["tour", slug],
        enabled: !!slug,
        queryFn: async () => {
          return await TourService.getOne(slug);
        },
      });
      
       const iconMapping = {
              Facebook : FaFacebook,
              Instagram: FaInstagram,
              YouTube: FaYoutube,
              TikTok: FaTiktok,
              Linkedln: FaLinkedin,
              Threads: FaThreads,
              X: FaXTwitter
          };
      
  return (
    <>  
        <div className="min-h-screen w-full">
            {isLoadingArticle ? (
                <ArticleDetailSkeleton/>
            ) : isErrorArticle && !isFetchingArticle && !tour || Object.keys(tour.data || {}).length === 0 ? (
                <div className="flex w-full h-full justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Data tidak tersedia</p>
                    </div>
                </div>
            ) : isErrorArticle && !isFetchingArticle  ? (
                <div className="w-full h-full flex justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Terjadi kesalahan, silakan ulangi</p>
                        <Button
                            size="sm"
                            onClick={() => {
                                refetchArticle();
                            }}
                        >
                            <LuRefreshCcw size={24} />
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <ThumbnailBanner bgUrl={`${tour.data.thumbnail}`}/>
                    <div className="pt-12 px-4 md:px-32">
                        <div className="flex items-center">
                            <p className="my-0 text-lg font-semibold text-gray-900 dark:text-white">{tour.data.address}</p>
                        </div>
                        <div className="col-span-2 lg:col-span-1 text-start">
                            <div className="flex justify-start items-center gap-x-2">
                                <CiMap className="w-4 h-4 rounded-sm text-[#113F67]"></CiMap>
                                <a href={tour.data.link.gmap} target="blank" className="text-md font-normal mb-0 text-gray-900 dark:text-white hover:font-bold ">Lokasi</a>
                            </div>
                            <div className="flex justify-start items-center gap-x-2">
                                <BiGlobe className="w-4 h-4 rounded-sm text-[#113F67]"></BiGlobe>
                                <a href={tour.data.link.website} target="blank" className="text-md font-normal mb-0 text-gray-900 dark:text-white">{tour.data.link.website}</a>
                            </div>
                            <div className="flex justify-start items-center gap-x-2">
                                <CgMail className="w-4 h-4 rounded-sm text-[#113F67]"></CgMail>
                                <a href={tour.data.link.email} target="blank" className="text-md font-normal mb-0 text-gray-900 dark:text-white">{tour.data.link.email}</a>
                            </div>
                        </div>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mt-2">{tour.data.description}</p>
                        <div className="w-full flex flex-wrap gap-2 md:gap-6 justify-center justify-items-center items-center my-4">
                        {tour.data.link.sosmed ? tour.data.link.sosmed.map(({ key, value }) => {
                            const Icon = iconMapping[key]; 
                            return (
                                <a 
                                    key={key} 
                                    href={`https://${value}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex justify-items-center w-fit items-center rounded-md bg-[#113F67] p-3 hover:bg-[#F3F9FB] group focus:ring-2 focus:ring-gray-400 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 ease-in-out"
                                >
                                    {Icon ? (
                                        <Icon className="w-6 h-6 lg:w-4 lg:h-4 rounded-sm text-white group-hover:text-[#113F67]" />
                                    ) : (
                                        <span className="text-white">{key}</span>
                                    )}
                                </a>
                            );
                        }) : <></>}
                    </div>
                    </div>
                </>
            )}
      </div>
    </>
  );
};

export default TourDetail;
