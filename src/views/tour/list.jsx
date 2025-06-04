import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import TourCard from "../../atoms/TourCard";
import useSetting from "../../hooks/settings/useSettings";
import Refetch from "../../atoms/refetch";
import useTour from "../../hooks/contens/tour/useList";

const TourList = () => {

    const [search, setSearch] = useState('');
    const {data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError:isSettingError } = useSetting(`tour-${import.meta.env.VITE_VILLAGE_ID}`, {});
    const {data: tours, isLoading, isError, fetchNextPage, hasNextPage, isFetching, refetch } =  useTour({"search": search, 'page_size': 6});

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

   const backgroundStyle = setting?.value?.imageUrl
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundImage: `url(/unavailable-image.png)` }

    const allTours = tours?.pages.filter(page => page?.data).flatMap(page => page.data) || [];
   return (
    <>  
        {
            isSettingLoading ? (
                <div className="flex animate-pulse space-x-3 w-full min-h-min ">
                    <div className="h-44 md:h-60 lg:h-80 w-full flex-1 bg-gray-300"></div>
                </div>
            ) : isSettingError && !isSettingFetching  ? (
                <Refetch refetch={refetchSetting} />
            ) : (
                <section style={backgroundStyle} className={`relative p-4 lg:p-14 bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 flex justify-start items-end`}>
                    <div className="absolute inset-0 bg-black/50 rounded-s-md"></div>
                    <div className="relative px-8 text-start">
                        <h2 className="mb-4 text-4xl sm:text-5xl font-bold text-white lg:text-6xl">{setting?.value?.title  ?? "[Judul wisata belum diatur]"}</h2>
                    </div>
                </section>
            )
        }
        <div className="grid w-full grid-cols-3 lg:grid-cols-4 gap-y-6 bg-gradient-to-b from-slate-100 via-blue-[#F3F9FB] to-blue-[#F3F9FB]">
            <div className="bg-transparent rounded-s-md col-span-4 lg:py-6 px-6 md:px-12 grid grid-cols-6">    
                <div className="col-span-6 grid grid-cols-6 gap-8">
                    <div className="col-span-6 grid grid-cols-6 gap-1 px-6 md:px-0 justify-between">
                        <div className="col-span-6 text-end">
                            <div className="relative w-full">
                                <input type="search" id="search-dropdown" value={search} onChange={handleChange} className="block px-5 w-full rounded-sm text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Cari judul ..." required />
                                <span type="submit" className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 grid grid-cols-6 md:gap-x-4 gap-y-2 md:gap-y-8 justify-items-center">
                        { isLoading || (!tours || !tours.pages[0] || tours.pages[0]?.data.length === 0) && isFetching ? (
                           <div className="col-span-6 w-full grid grid-cols-6 px-8 md:px-0 gap-6 justify-items-center">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div  key={index} className="col-span-6 px-0 md:px-3 md:col-span-3 lg:col-span-2 w-full">
                                        <div className=" w-full bg-gray-400 dark:bg-gray-600 rounded animate-pulse">
                                            <div className="h-24 w-full bg-gray-400 dark:bg-gray-600 rounded"></div>
                                            <div className="h-10 w-3/4 bg-gray-400 dark:bg-gray-600 rounded"></div>
                                            <div className="h-5 w-2/4 bg-gray-400 dark:bg-gray-600 rounded"></div>
                                            <div className="h-5 w-2/4 bg-gray-400 dark:bg-gray-600 rounded"></div>
                                            <div className="h-5 w-1/3 bg-gray-400 dark:bg-gray-600 rounded"></div>
                                            <div className="h-5 w-1/3 bg-gray-400 dark:bg-gray-600 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : !isError && !isFetching && (!tours || !tours.pages[0] || tours.pages[0]?.data.length === 0) ? (
                            <div className="flex col-span-6 w-full h-full justify-center">
                                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400">Wisata tidak tersedia</p>
                                </div>
                            </div>
                        ) : isError && !isFetching  ? (
                            <div className="w-full col-span-6 h-full flex justify-center">
                                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                                    <Refetch refetch={refetch}/>
                                </div>
                            </div>
                        ) : (
                            <>
                                {allTours.map((tour) => 
                                    <TourCard key={tour.id} slug={tour.slug} thumbnail={tour.thumbnail} title={tour.title} address={tour.address} map={tour.link.gmap} website={tour.link.website} email={tour.link.email} socmed={tour.link.sosmed}/>
                                )}
                                <div className="col-span-6">
                                    <button 
                                        className="inline-flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-transparent text-gray-900 focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:text-gray-400 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase" 
                                        onClick={() => fetchNextPage()} 
                                        disabled={!hasNextPage || isFetching}
                                    >
                                        Tampilkan lebih banyak
                                        <BiPlus />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default TourList;
