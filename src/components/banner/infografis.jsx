import { useQuery } from "react-query";
import { LuRefreshCcw } from "react-icons/lu";
import { Button } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import SliderInfografis from "../../atoms/slider";
import { useState } from "react";
import LightboxImage from "../../atoms/Lightbox";
import InfografisService from "../../services/controllers/infografis/infografis.service";
const InfografisBanner = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const {
        data: infografies,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery({
        queryKey: ["infografies"],
        queryFn: async () => {
         
          return await InfografisService.getAll(
                { 
                    page_size: 10,
                }
            );
        }
      });

      const handleInfografisClick = (index) => {setIsOpen(true); setCurrentIndex(index)};
  
  return (
       <>
            <div className="col-span-4 bg-[#226597] bg-opacity-90 lg:rounded-e-md py-3 lg:col-span-1 flex justify-center items-center">
                <div className="max-w-sm w-4/5 rounded-lg dark:bg-gray-800">
                    {isLoading ? (
                            <Skeleton height="24rem" width="100%" borderRadius="0.5rem" />
                        ) : isError && !isFetching && !infografies || infografies.data?.length === 0 ? (
                            <div className="flex col-span-6 w-full h-full justify-center">
                                <div className="flex flex-col items-center justify-top gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400">Data tidak tersedia</p>
                                </div>
                            </div>
                        ) : isError && !isFetching  ? (
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-black text-center text-2xl dark:text-gray-400">Terjadi kesalahan, silakan ulangi</p>
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
                                <SliderInfografis data={infografies.data} onClickHandler={handleInfografisClick} />
                                <LightboxImage data={infografies.data} isOpen={isOpen} currentIndex={currentIndex} setIsOpen={setIsOpen} />
                            </>
                        )
                    }
                </div>
            </div>
       </>
  );
};


export default InfografisBanner;