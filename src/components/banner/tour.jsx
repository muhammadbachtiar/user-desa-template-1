import { Link } from "react-router-dom";
import useSetting from "../../hooks/settings/useSettings";
import Refetch from "../../atoms/refetch";

const TourBanner = () => {

  const { data, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError:isSettingError } = useSetting(`tour-${import.meta.env.VITE_VILLAGE_ID}`, {});

  return (
       <>
        <div className="col-span-4 grid grid-cols-6 justify-items-center gap-6">
                 {
                    isSettingLoading ? (
                    <>
                        <div className="col-span-6 lg:col-span-3 xl:col-span-4 w-full rounded-lg dark:bg-gray-800 animate-pulse">
                            <div className="h-10 w-3/4 bg-gray-300 rounded mb-5"></div>
                            <div className="h-6 w-1/2 bg-gray-300 rounded mt-2"></div>
                            <div className="h-4 w-full bg-gray-300 rounded mt-2"></div>
                            <div className="h-4 w-11/12 bg-gray-300 rounded mt-2"></div>
                            <div className="h-4 w-10/12 bg-gray-300 rounded mt-2"></div>
                            <div className="inline-flex justify-center mt-8 border-2 lg:mt-12 items-center py-4 px-6 rounded-md bg-gray-300 w-40 h-10"></div>
                        </div>
                        <div className="col-span-6 lg:col-span-3 xl:col-span-2 flex justify-center items-center dark:bg-gray-800 animate-pulse">
                            <div className="h-full w-full min-h-96 min-w-96 shadow-2xl backdrop-blur-2xl rounded-4xl bg-gray-300"></div>
                        </div>
                    </>
                    ) : !isSettingFetching && isSettingError ? (
                        <div className="w-full col-span-6 flex justify-center dark:bg-gray-800">          
                            <Refetch refetch={refetchSetting} />
                        </div>
                    ) : (
                      <>
                       <div className="col-span-6 lg:col-span-3 xl:col-span-4 w-full rounded-lg flex flex-col justify-center dark:bg-gray-800">                  
                            <h5 className="text-4xl font-bold mb-5 tracking-tighter text-gray-900 dark:text-white">{ data?.value?.title ?? "[Judul wisata belum diatur]" }</h5>
                            <div className="flex items-center mt-2">
                                <p className="my-0 text-lg font-semibold text-gray-900 dark:text-white">{ data?.value?.subTitle ?? "[Sub judul wisata belum diatur]"}</p>
                            </div>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mt-2">{data?.value?.description ?? "[Deskripsi wisata belum diatur]" }</p>
                            <Link to={'/tour'} className="inline-flex justify-center mt-8 lg:mt-12 hover:text-black items-center w-full lg:w-48 py-3 px-6 text-base font-medium text-center bg-[#113F67] text-white rounded-md hover:bg-white focus:ring-2 focus:ring-gray-400 transition transform duration-300 ease-in-out">
                                Lihat Selengkapnya
                            </Link>
                        </div>
                        <div className="col-span-6 lg:col-span-3 xl:col-span-2 flex justify-center items-center dark:bg-gray-800">
                            <div className="aspect-video lg:aspect-square w-full  backdrop-blur-2xl">
                                <img
                                className="h-full w-full object-cover rounded"
                                src={data?.value?.imageUrl ?? "/unavailable-image.png"}
                                alt="image description"
                                />
                            </div>
                        </div>
                      </>
                    )
                }
            </div>
       </>
  );
};

export default TourBanner;