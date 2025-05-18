'use client'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import useApp from '../../hooks/contens/useApp';
import Icons from '../../atoms/icons/icon';
import { Link } from 'react-router-dom';
import useSetting from '../../hooks/settings/useSettings';
import Refetch from '../../atoms/refetch';

export default function App() {

  const { data, isLoading, isFetching, refetch, isError } = useApp();
  const { data: appSetting,  isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting('app', {});
  
  return (
        <section className="fixed block bottom-0 left-0 z-20 max-w-full w-full h-16 bg-white border-t dark:bg-gray-700 dark:border-gray-600 md:static md:grid md:grid-cols-8 md:gap-2 md:p-6 md:max-w-none md:w-auto md:h-auto md:bg-transparent md:border-0">
            <div className='hidden md:flex flex-col col-span-8 gap-2 mb-4 justify-items-center items-center '>
                 {
                    isSettingLoading ? (
                        <div className="flex animate-pulse space-x-3">
                            <div className="flex flex-col justify-center items-center align-middle gap-y-6">
                                <div className=" h-8 w-30 rounded bg-gray-200"></div>
                                <div className="h-4 w-36 rounded bg-gray-200"></div>
                            </div>
                        </div>
                    ) : isSettingError && !isSettingFetching  ? (
                        <Refetch refetch={refetchSetting} />
                    ) : (
                    <>
                        <span className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">{(!appSetting || Object.keys(appSetting.value || {}).length === 0) ? "[Judul layanan belum diatur]" : appSetting.value.title }</span>
                        <span className="self-center align-baseline text-md font-normal italic text-[#DDA853]">{(!appSetting || Object.keys(appSetting.value || {}).length === 0) ? "[Sub judul layanan belum diatur]" : appSetting.value.subTitle }</span>
                    </>
                    )
                }
            </div>
            <div className="col-span-8 grid grid-cols-4 h-full w-full font-medium md:gap-x-4">
                 {
                    isLoading || (!data || data.value.length === 0) && isFetching ? (
                        <div className="flex w-full col-span-4 animate-pulse space-x-3">
                            {Array.from({length:4}).map((_, index) => (
                                <div key={index} className="flex flex-col mx-2 bg-gray-200 rounded-md w-full h-14 md:h-56"></div>
                            ))}
                        </div>
                    ) : !isError && !isFetching && (!data || data.value.length === 0) ? (
                       <div className="flex justify-center w-full col-span-4 space-x-3">
                            <p className="text-black flex text-center items-center text-md dark:text-gray-400">Layanan tidak tersedia</p>
                        </div>
                    ) : isError && !isFetching  ? (
                        <Refetch refetch={refetch} />
                    ) : 
                        data.value.map((item, index) => {
                        const IconComponent = Icons[item.icon]
                            return (
                                <Popover key={index}>
                                    <PopoverButton className="h-full w-full inline-flex flex-col items-center justify-center px-5 bg-[#F3F9FB]  md:col-span-2 md:rounded-lg md:justify-items-center md:bg-white dark:hover:bg-gray-800 group hover:bg-[#113F67] hover:scale-105 hover:-translate-y-1 focus:ring-2 focus:ring-gray-400 focus:bg-[#113F67] transition-all transform duration-300 ease-in-out">
                                        <IconComponent className='w-6 h-6 mb-1 text-[#226597] md:w-32 md:h-32 md:mb-2 md:selft-center md:text-gray-800 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500'/> 
                                        <span className="text-sm text-[#226597] md:mb-2 md:text-sm md:text-center md:font-bold md:tracking-tight md:text-gray-900 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500">{item.title}</span>
                                    </PopoverButton>
                                    <PopoverPanel transition={true} anchor="top" className="flex flex-col p-6 w-screen h-1/2 bg-white border border-gray-200 shadow-xs z-20 rounded-lg [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 transition duration-200 ease-in-out">
                                        <div className="p-4 pb-0 text-lg text-gray-900 md:pb-4 dark:text-white">
                                            <div className="flex items-center px-2 py-1 space-x-3 rtl:space-x-reverse rounded-md hover:bg-[#226597] hover:scale-105 transition transform duration-300 ease-in-out">
                                                <IconComponent className='w-6 h-6 mb-1 text-[#226597] dark:text-gray-400 group-hover:text-white dark:group-hover:text-blue-500'/>
                                                <span className="text-[#226597] dark:text-gray-400 group-hover:text-white dark:group-hover:text-blue-500">Perizinan</span>
                                            </div>
                                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                            <ul className="space-y-4 mt-2">
                                                {item.subMenu.map((subItem, subIndex) => {
                                                    const IconComponent = Icons[item.icon]
                                                        return(
                                                            <li key={subIndex}>
                                                                <Link to="#" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                                                    <IconComponent className='w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500'/>
                                                                    {subItem.title}
                                                                </Link>
                                                            </li>
                                                        )
                                                    })}
                                            </ul>
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            )
                        }
                    )
                }
            </div>
        </section>
  );
}
