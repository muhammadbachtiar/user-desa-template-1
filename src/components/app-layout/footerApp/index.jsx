import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Logo from "../../../atoms/logo";
import useSetting from "../../../hooks/settings/useSettings";
import Refetch from "../../../atoms/refetch";
import sosmed from "../../../atoms/icons/sosmed.js"

const FooterApp = () => {
  const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting("footer", {});
  return (
       <>
        <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4">
                <div className="w-full flex flex-row gap-6 justify-center">
                     {
                        isSettingLoading || isSettingFetching ? (
                             <div className="col-span-4 lg:col-span-2 flex flex-col gap-6">
                                <div className="w-full flex flex-wrap gap-6 justify-start">
                                    <div className="h-10 w-10 bg-gray-300 rounded"></div>
                                    <div className="h-10 w-10 bg-gray-300 rounded"></div>
                                    <div className="h-10 w-10 bg-gray-300 rounded"></div>
                                    <div className="h-10 w-10 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ) : !isSettingError && !isSettingFetching && (!setting || !setting.value) ? (
                            <div className="flex mb-4 justify-center col-span-8 w-full">
                            <p className="text-black text-center text-md dark:text-gray-400">[Sosial Media belum di atur]</p>
                            </div>
                        ) : isSettingError && !isSettingFetching  ? (
                            <div className="flex justify-center items-center mb-4 col-span-8 w-full">
                                <Refetch refetch={refetchSetting} />
                            </div>
                        ) :  
                            setting.value.socialMedia ? Object.entries(setting.value.socialMedia).map(([key, value]) => {
                                const Icon = sosmed[key]; 
                                return (
                                    <a 
                                        key={key} 
                                        href={`https://${value.profileUrl}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex justify-items-center w-fit items-center rounded-md bg-white p-3 hover:bg-black border-0 hover:border-2 hover:border-white group focus:ring-2 focus:ring-white transition-all transform duration-300 ease-in-out"
                                    >
                                        {Icon ? (
                                            <Icon className="w-6 h-6 lg:w-4 lg:h-4 rounded-sm text-black group-hover:text-white" />
                                        ) : (
                                            <span className="text-white">{key}</span>
                                        )}
                                    </a>
                                );
                            }) : <></>            
                     }
                </div>
                <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
                <div className="grid grid-cols-2 gap-y-5 items-center justify-between mx-0 lg:mx-16">
                    <div className="col-span-2 lg:col-span-1 text-start">
                        {
                            isSettingLoading ? (
                                <div className="col-span-4 lg:col-span-2 flex flex-col gap-2">
                                        <div className="flex items-center gap-x-2">
                                        <div className="h-4 w-4 bg-gray-300 rounded"></div>
                                        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                        <div className="h-4 w-4 bg-gray-300 rounded"></div>
                                        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                        <div className="h-4 w-4 bg-gray-300 rounded"></div>
                                        <div className="h-4 w-3/5 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                            ) : isSettingError && !isSettingFetching  ? (
                                <div className="flex justify-center items-center mb-4 col-span-8 w-full">
                                    <Refetch refetch={refetchSetting} />
                                </div>
                            ) :  
                                <>
                                    <div className="flex justify-start items-center gap-x-2">
                                        <FaLocationDot className="w-4 h-4 rounded-sm text-[#113F67]"></FaLocationDot>
                                        <p className="text-md font-normal mb-0 text-gray-900 dark:text-white">{(!setting || Object.keys(setting.value || {}).length === 0) ? "[Alamat belum diatur]" : setting.value.contactUs.address }</p>
                                    </div>
                                    <div className="flex justify-start items-center gap-x-2">
                                        <FaPhone className="w-4 h-4 rounded-sm text-[#113F67]"></FaPhone>
                                        <p className="text-md font-normal mb-0 text-gray-900 dark:text-white">{(!setting || Object.keys(setting.value || {}).length === 0) ? "[Nomor handphone belum diatur]" : setting.value.contactUs.phone }</p>
                                    </div>
                                    <div className="flex justify-start items-center gap-x-2">
                                        <MdEmail className="w-4 h-4 rounded-sm text-[#113F67]"></MdEmail>
                                        <p className="text-md font-normal mb-0 text-gray-900 dark:text-white">{(!setting || Object.keys(setting.value || {}).length === 0) ? "[Email belum diatur]" : setting.value.contactUs.email }</p>
                                    </div>
                                </>      
                        }
                    </div>
                    <div className="col-span-2 lg:col-span-1 flex justify-start lg:justify-end">
                        <Logo textColor="text-black" hoverBgColor="bg-slate-100"/>
                    </div>
                </div>  
                <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
                <span className="block text-sm text-center text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Muara Enim™</a>. All Rights Reserved.</span>
            </div>
        </footer>
       </>
  );
};

export default FooterApp;