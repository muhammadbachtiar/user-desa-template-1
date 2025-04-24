import { Link } from "react-router-dom";
import SliderCard from "../../atoms/slider/sliderCard";
import { useQuery } from "react-query";
import ArticleService from "../../services/controllers/article/article.service";
import PropTypes from "prop-types";
import { LuRefreshCcw } from "react-icons/lu";
import { Button } from "flowbite-react";
import ArticleCardSkeleton from "../../atoms/loadingComponent/article/cardSekeleton";
const ArticleBanner = ({bgClass, title}) => {

    const {
        data: articles,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
         
          return await ArticleService.getAll(
                { 
                    with:"category",
                    page_size: 10,
                }
            );
        }
      });
  
  return (
       <>
        <div className={`relative lg:${bgClass} lg:bg-cover lg:bg-bottom bg-transparent rounded-s-md col-span-4 lg:col-span-3 lg:pt-4 px-6 lg:ps-12 grid grid-cols-6`}>    
            <div className="absolute inset-0 bg-transparent lg:bg-white/80 rounded-s-md"></div>
            <div className="relative z-10 col-span-6 grid grid-cols-6 gap-x-8 gap-y-4">
                <div className="col-span-6 grid grid-cols-6  gap-8 justify-between">
                    <div className="col-span-3">
                        <span className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">{title}</span>
                    </div>
                    <div className="col-span-3 text-end">
                        <Link to={"/article"} className="inline-flex font-medium items-center text-center text-[#DDA853] hover:text-[#b48943] hover:underline focus:text-[#b48943] focus:underline">
                            Buka Halaman Artikel
                            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="col-span-6 justify-items-center">
                    {isLoading ? (
                            <div className="h-auto w-full grid grid-cols-6 gap-4 px-2 md:px-8">
                                <div className="col-span-6 md:col-span-3 lg:col-span-2 px-6 md:px-3 w-full">
                                <ArticleCardSkeleton/>
                                </div>
                                <div className="hidden md:block md:col-span-3 lg:col-span-2 px-6 md:px-3 w-full">
                                <ArticleCardSkeleton/>
                                </div>
                                <div className="hidden lg:block md:col-span-3 lg:col-span-2  px-6 md:px-3 w-full">
                                <ArticleCardSkeleton/>
                                </div>
                          </div>
                        ) : isError && !isFetching && !articles || articles.data?.length === 0 ? (
                            <div className="flex col-span-6 w-full h-full justify-center">
                                <div className="flex flex-col items-center justify-top gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400">Data tidak tersedia</p>
                                </div>
                            </div>
                        ) : isError && !isFetching  ? (
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-black text-2xl dark:text-gray-400">Terjadi kesalahan, silakan ulangi</p>
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        refetch();
                                    }}
                                >
                                    <LuRefreshCcw size={24} />
                                </Button>
                            </div>
                        ) : (
                            <>
                               <div className="max-w-sm sm:max-w-full w-full overflow-hidden dark:bg-gray-800 dark:border-gray-700"> <SliderCard data={articles.data} isIncludeModal={true}/></div>
                            </>
                        )}
                </div>
            </div>
        </div>
       </>
  );
};

ArticleBanner.propTypes = {
    bgClass: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default ArticleBanner;