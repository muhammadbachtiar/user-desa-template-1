import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
const Jumbotron = () => {
     const [searchValue, setSearchValue] = useState('');
    
        const handleChange = (e) => {
            setSearchValue(e.target.value);
        };

    // const {
    //     data: articles,
    //     isLoading,
    //     isError,
    //     isFetching,
    //     refetch,
    //   } = useQuery({
    //     queryKey: ["articles"],
    //     queryFn: async () => {
         
    //       return await ArticleService.getAll(
    //             { 
    //                 with:"category",
    //                 page_size: 10,
    //             }
    //         );
    //     }
    //   });
  
  return (
       <>
        {/* {isLoading ? (
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
            )}         */}
            <section className="relative h-dvh flex justify-center items-center">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                >
                    <source src="/Visit Muara Enim Teaser.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20"></div>
                <div className="relative z-10 px-8 md:px-24 xl:px-64 text-center py-16 lg:py-32">
                    <h1 className="mb-4 text-5xl font-bold text-white lg:text-6xl">Lorem ipsum dolor sit amet, consectetur</h1>
                    <p className="mb-7 text-base font-normal tracking-tight leading-5 text-white lg:text-xl sm:px-16 xl:px-48">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                    <div className="flex flex-col justify-center items-center px-6 sm:gap-2 space-y-4 sm:justify-center sm:space-y-0 lg:px-36 md:gap-6">
                        <div className="flex w-full">
                            <div className="relative w-full">
                                <input type="search" id="search-dropdown" onChange={handleChange} className="block py-3 px-5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-3xl rounded-s-3xl border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Apa yang Anda cari?" required />
                                {searchValue ? (
                                      <Link to={`/search/${searchValue}`}> 
                                        <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-3xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                            </svg>
                                        </span>
                                    </Link>
                                    ) : (
                                    <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-3xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
       </>
  );
};

Jumbotron.propTypes = {
    bgClass: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default Jumbotron;