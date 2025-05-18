import { Link } from "react-router-dom";
import useSetting from "../../hooks/settings/useSettings";
import Refetch from "../../atoms/refetch";

const TourBanner = () => {
  const { data, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError:isSettingError } = useSetting('tour', {});

  return (
       <>
        <div className="col-span-4 grid grid-cols-6 my-4 px-6 lg:px-12 justify-items-center">
                 {
                    isSettingLoading ? (
                    <>
                        <div className="col-span-6 lg:col-span-3 xl:col-span-4 w-full rounded-lg dark:bg-gray-800 py-4 lg:py-12 pe-12 animate-pulse">
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
                       <div className="col-span-6 md:col-span-3 xl:col-span-4 w-full rounded-lg dark:bg-gray-800 py-4 lg:py-12 pe-12">                  
                            <h5 className="text-4xl font-bold mb-5 tracking-tighter text-gray-900 dark:text-white">{(!data || Object.keys(data.value || {}).length === 0) ? "[Judul wisata belum diatur]" : data.value.title }</h5>
                            <div className="flex items-center mt-2">
                                <p className="my-0 text-lg font-semibold text-gray-900 dark:text-white">{(!data || Object.keys(data.value || {}).length === 0) ? "[Sub judul wisata belum diatur]" : data.value.subTitle }</p>
                            </div>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mt-2">{(!data || Object.keys(data.value || {}).length === 0) ? "[Deskripsi wisata belum diatur]" : data.value.description }</p>
                            <Link to={'/tour'} className="inline-flex justify-center mt-8 lg:mt-12 hover:text-black items-center py-5 px-8 text-base font-medium text-center bg-[#113F67] text-white rounded-md hover:bg-white focus:ring-2 focus:ring-gray-400 transition transform duration-300 ease-in-out">
                                Lihat Selengkapnya
                            </Link>
                        </div>
                        <div className="col-span-6 md:col-span-3 xl:col-span-2 flex justify-center items-center dark:bg-gray-800">                  
                            <img
                                className="h-full w-full shadow-2xl backdrop-blur-2xl"
                                src={(!data || Object.keys(data.value || {}).length === 0) ? "/unavailablei-image.png" : data.value.imageUrl }
                                alt="image description"
                            />
                        </div>
                      </>
                    )
                }
            </div>
       </>
  );
};

export default TourBanner;