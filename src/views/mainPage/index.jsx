import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiPencil } from 'react-icons/hi';
import { HiAcademicCap } from 'react-icons/hi';
import { HiUserGroup } from 'react-icons/hi';
import { HiMap } from 'react-icons/hi2';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import ArticleBanner from "../../components/banner/article";
import InfografisBanner from "../../components/banner/infografis";
import TourBanner from "../../components/banner/tour";
import Jumbotron from "../../components/banner/jumbotron";

const MainPage = () => {
 
  return (
    <>  
        <Jumbotron/>
        <div className="fixed block bottom-0 left-0 z-20 max-w-full w-full h-16 bg-white border-t dark:bg-gray-700 dark:border-gray-600 md:static md:grid md:grid-cols-8 md:gap-2 md:p-6 md:max-w-none md:w-auto md:h-auto md:bg-transparent md:border-0">
            <div className='hidden md:flex flex-col col-span-8 gap-2 mb-4 justify-items-center items-center '>
                <span className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">Layanan Digital</span>
                <span className="self-center align-baseline text-md font-normal italic text-[#DDA853]">Pelayanan Pemerintah Kabupaten Muara Enim</span>
            </div>
            <div className="col-span-8 grid grid-cols-4 h-full w-full font-medium md:gap-x-4">
                <Popover>
                    <PopoverButton className="h-full w-full inline-flex flex-col items-center justify-center px-5 bg-[#F3F9FB]  md:col-span-2 md:rounded-lg md:justify-items-center md:bg-white dark:hover:bg-gray-800 group hover:bg-[#113F67] hover:scale-105 hover:-translate-y-1 focus:ring-2 focus:ring-gray-400 focus:bg-[#113F67] transition-all transform duration-300 ease-in-out">
                            <HiPencil className='w-6 h-6 mb-1 text-[#226597] md:w-32 md:h-32 md:mb-2 md:selft-center md:text-gray-800 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500'></HiPencil>
                            <span className="text-sm text-[#226597] md:mb-2 md:text-sm md:text-center md:font-bold md:tracking-tight md:text-gray-900 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500">Perizinan</span>
                    </PopoverButton>
                    <PopoverPanel transition={true} anchor="top" className="flex flex-col p-6 w-screen h-1/2 bg-white border border-gray-200 shadow-xs z-20 rounded-lg [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 transition duration-200 ease-in-out ">
                        <div className="p-4 pb-0 text-lg text-gray-900 md:pb-4 dark:text-white">
                            <div className="flex items-center px-2 py-1 space-x-3 rtl:space-x-reverse rounded-md hover:bg-[#226597] hover:scale-105 transition transform duration-300 ease-in-out">
                                <HiPencil className='w-6 h-6 mb-1 text-[#226597] dark:text-gray-400 group-hover:text-white dark:group-hover:text-blue-500'></HiPencil>
                                <span className="text-[#226597] dark:text-gray-400 group-hover:text-white dark:group-hover:text-blue-500">Perizinan</span>
                            </div>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <ul className="space-y-4 mt-2" aria-labelledby="mega-menu-icons-dropdown-button">
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">About us</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                        </svg>
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Library</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z"/>
                                            <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z"/>
                                            <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z"/>
                                        </svg>
                                        Library
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Resources</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                            <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z"/>
                                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/>
                                        </svg>
                                        Resources
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Pro Version</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z"/>
                                        </svg>
                                        Pro Version
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </PopoverPanel>
                </Popover>
                <Popover>
                    <PopoverButton className="h-full w-full inline-flex flex-col items-center justify-center px-5 bg-[#F3F9FB]  md:col-span-2 md:rounded-lg md:justify-items-center md:bg-white dark:hover:bg-gray-800 group hover:bg-[#113F67] hover:scale-105 hover:-translate-y-1 focus:ring-2 focus:ring-gray-400 focus:bg-[#113F67] transition-all transform duration-300 ease-in-out">
                            <HiAcademicCap className='w-6 h-6 mb-1 text-[#226597] md:w-32 md:h-32 md:mb-2 md:selft-center md:text-gray-800 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500'></HiAcademicCap>
                            <span className="text-sm text-[#226597] md:mb-2 md:text-sm md:text-center md:font-bold md:tracking-tight md:text-gray-900 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500">Pendidikan</span>
                    </PopoverButton>
                    <PopoverPanel transition={true} anchor="top" className="flex flex-col p-6 w-screen h-1/2 bg-white border border-gray-200 shadow-xs z-20 rounded-lg [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 transition duration-200 ease-in-out ">
                        <div className="p-4 pb-0 text-lg text-gray-900 md:pb-4 dark:text-white">
                            <div className="flex items-center px-2 py-1 space-x-3 rtl:space-x-reverse rounded-md hover:bg-[#226597] hover:scale-105 transition transform duration-300 ease-in-out">
                                <HiAcademicCap className='w-6 h-6 mb-1 text-[#226597] dark:text-gray-400 group-hover:text-white dark:group-hover:text-blue-500'></HiAcademicCap>
                                <span className="text-[#226597] dark:text-gray-400 group-hover:text-white dark:group-hover:text-blue-500">Pendidikan</span>
                            </div>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <ul className="space-y-4 mt-2" aria-labelledby="mega-menu-icons-dropdown-button">
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">About us</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                        </svg>
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Library</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z"/>
                                            <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z"/>
                                            <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z"/>
                                        </svg>
                                        Library
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Resources</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                            <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z"/>
                                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/>
                                        </svg>
                                        Resources
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Pro Version</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z"/>
                                        </svg>
                                        Pro Version
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </PopoverPanel>
                </Popover>
                <Popover>
                    <PopoverButton className="h-full w-full inline-flex flex-col items-center justify-center px-5 bg-[#F3F9FB]  md:col-span-2 md:rounded-lg md:justify-items-center md:bg-white dark:hover:bg-gray-800 group hover:bg-[#113F67] hover:scale-105 hover:-translate-y-1 focus:ring-2 focus:ring-gray-400 focus:bg-[#113F67] transition-all transform duration-300 ease-in-out">
                            <HiUserGroup className='w-6 h-6 mb-1 text-[#226597] md:w-32 md:h-32 md:mb-2 md:selft-center md:text-gray-800 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500'></HiUserGroup>
                            <span className="text-sm text-[#226597] md:mb-2 md:text-sm md:text-center md:font-bold md:tracking-tight md:text-gray-900 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500">Kependudukan</span>
                    </PopoverButton>
                    <PopoverPanel transition={true} anchor="top" className="flex flex-col p-6 w-screen h-1/2 bg-white border border-gray-200 shadow-xs z-20 rounded-lg [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 transition duration-200 ease-in-out ">
                        <div className="p-4 pb-0 text-lg text-gray-900 md:pb-4 dark:text-white">
                            <div className="flex items-center px-2 py-1 space-x-3 rtl:space-x-reverse rounded-md hover:bg-[#226597] hover:scale-105 transition transform duration-300 ease-in-out">
                                <HiUserGroup className='w-6 h-6 mb-1 text-[#226597] dark:text-gray-400 group-hover:text-white dark:group-hover:text-blue-500'></HiUserGroup>
                                <span className="text-[#226597] dark:text-gray-400 group-hover:text-white dark:group-hover:text-blue-500">Kependudukan</span>
                            </div>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <ul className="space-y-4 mt-2" aria-labelledby="mega-menu-icons-dropdown-button">
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">About us</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                        </svg>
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Library</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z"/>
                                            <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z"/>
                                            <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z"/>
                                        </svg>
                                        Library
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Resources</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                            <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z"/>
                                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/>
                                        </svg>
                                        Resources
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Pro Version</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z"/>
                                        </svg>
                                        Pro Version
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </PopoverPanel>
                </Popover>
                <Popover>
                    <PopoverButton className="h-full w-full inline-flex flex-col items-center justify-center px-5 bg-[#F3F9FB]  md:col-span-2 md:rounded-lg md:justify-items-center md:bg-white dark:hover:bg-gray-800 group hover:bg-[#113F67] hover:scale-105 hover:-translate-y-1 focus:ring-2 focus:ring-gray-400 focus:bg-[#113F67] transition-all transform duration-300 ease-in-out">
                            <HiMap className='w-6 h-6 mb-1 text-[#226597] md:w-32 md:h-32 md:mb-2 md:selft-center md:text-gray-800 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500'></HiMap>
                            <span className="text-sm text-[#226597] md:mb-2 md:text-sm md:text-center md:font-bold md:tracking-tight md:text-gray-900 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500">Pariwisata</span>
                    </PopoverButton>
                    <PopoverPanel transition={true} anchor="top" className="flex flex-col p-6 w-screen h-1/2 bg-white border border-gray-200 shadow-xs z-20 rounded-lg [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 transition duration-200 ease-in-out ">
                        <div className="p-4 pb-0 text-lg text-gray-900 md:pb-4 dark:text-white">
                            <div className="flex items-center px-2 py-1 space-x-3 rtl:space-x-reverse rounded-md hover:bg-[#226597] hover:scale-105 transition transform duration-300 ease-in-out">
                                <HiMap className='w-6 h-6 mb-1 text-[#226597] dark:text-gray-400 group-hover:text-white dark:group-hover:text-blue-500'></HiMap>
                                <span className="text-[#226597] dark:text-gray-400 group-hover:text-white dark:group-hover:text-blue-500">Pariwisata</span>
                            </div>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <ul className="space-y-4 mt-2" aria-labelledby="mega-menu-icons-dropdown-button">
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">About us</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                        </svg>
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Library</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z"/>
                                            <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z"/>
                                            <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z"/>
                                        </svg>
                                        Library
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Resources</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                            <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z"/>
                                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/>
                                        </svg>
                                        Resources
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span className="sr-only">Pro Version</span>
                                        <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z"/>
                                        </svg>
                                        Pro Version
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </PopoverPanel>
                </Popover>
            </div>
        </div>
        <div tabIndex={1} className="grid w-full grid-cols-3 lg:grid-cols-4 gap-y-6 py-6 bg-gradient-to-b from-slate-100 via-blue-[#F3F9FB] to-blue-[#F3F9FB]">
            <ArticleBanner bgClass="bg-[url(/muara-enim-skyline.jpg)]" title="Artikel Terbaru"/>
            <InfografisBanner/>
            <TourBanner/>
        </div>
    </>
  );
};

export default MainPage;
