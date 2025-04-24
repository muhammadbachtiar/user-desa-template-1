import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

const SearchPage = () => {
    const { search } = useParams();
    const [searchValue, setSearchValue] = useState(search);
    console.log(searchValue, search)

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

  return (
    <>  
        <div className="min-h-screen p-4 md:p-12 w-full">
            <div className="col-span-6 grid grid-cols-6 gap-x-4 gap-y-8">
                <div className="relative w-full col-span-6">
                    <input type="search" id="search-dropdown"value={searchValue} onChange={handleChange} className="block px-5 w-full rounded-sm text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Cari judul ..." />
                    <span type="submit" className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </span>
                </div>
                <div className="relative w-full hidden md:block md:col-span-2 lg:col-span-1">
                    <div className="px-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                        <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                            <li>
                                <a href="#article" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                    Artikel
                                </a>
                            </li>
                            <li>
                                <a href="#infografis" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                    Infografis
                                </a>
                            </li>
                            <li>
                                <a href="#wisata" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                    Wisata
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="relative w-full col-span-6 grid grid-cols-6 gap-y-8 md:col-span-4 lg:col-span-5">
                    <div className="col-span-6">
                        <div className="col-span-6">
                            <span id="article" className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">Artikel</span>
                        </div>
                        <div className="col-span-6">
                            <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700"></hr>
                        </div>
                         <div className="col-span-6">  
                            <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                <div className="flex flex-col pb-3 bg-gray-50 hover:bg-gray-300">
                                    <dd className="text-lg font-semibold">
                                        yourname@flowbite.com
                                    </dd>
                                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                                        Email address
                                    </dt>
                                </div>
                                <div className="flex flex-col py-3  hover:bg-gray-300">
                                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                                        Home address
                                    </dt>
                                    <dd className="text-lg font-semibold">
                                        92 Miles Drive, Newark, NJ 07103, California, USA
                                    </dd>
                                </div>
                                <div className="flex flex-col pb-3 bg-gray-50 hover:bg-gray-300">
                                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone number</dt>
                                    <dd className="text-lg font-semibold">+00 123 456 789 / +12 345 678</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="col-span-6">
                            <span id="infografis" className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">Infografis</span>
                        </div>
                        <div className="col-span-6">
                            <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700"></hr>
                        </div>
                         <div className="col-span-6">  
                            <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                <div className="flex flex-col pb-3 bg-gray-50 hover:bg-gray-300">
                                    <dd className="text-lg font-semibold">
                                        yourname@flowbite.com
                                    </dd>
                                </div>
                                <div className="flex flex-col py-3  hover:bg-gray-300">
                                    <dd className="text-lg font-semibold">
                                        92 Miles Drive, Newark, NJ 07103, California, USA
                                    </dd>
                                </div>
                                <div className="flex flex-col pb-3 bg-gray-50 hover:bg-gray-300">
                                    <dd className="text-lg font-semibold">+00 123 456 789 / +12 345 678</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="col-span-6">
                            <span id="wisata" className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">Wisata</span>
                        </div>
                        <div className="col-span-6">
                            <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700"></hr>
                        </div>
                         <div className="col-span-6">  
                            <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                <div className="flex flex-col pb-3 bg-gray-50 hover:bg-gray-300">
                                    <dd className="text-lg font-semibold">
                                        yourname@flowbite.com
                                    </dd>
                                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                                        Email address
                                    </dt>
                                </div>
                                <div className="flex flex-col py-3  hover:bg-gray-300">
                                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                                        Home address
                                    </dt>
                                    <dd className="text-lg font-semibold">
                                        92 Miles Drive, Newark, NJ 07103, California, USA
                                    </dd>
                                </div>
                                <div className="flex flex-col pb-3 bg-gray-50 hover:bg-gray-300">
                                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone number</dt>
                                    <dd className="text-lg font-semibold">+00 123 456 789 / +12 345 678</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default SearchPage;
