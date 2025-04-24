import { FaInstagram, FaYoutube, FaFacebookF, FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Logo from "../../atoms/logo";
const FooterApp = () => {
  
  return (
       <>
        <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4">
                <div className="w-full flex flex-row gap-6 justify-center">
                    <div className="flex justify-center items-center rounded-md bg-[#F3F9FB] p-3 hover:bg-[#113F67] group focus:ring-2 focus:ring-gray-400 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 ease-in-out">
                        <FaFacebookF className="w-6 h-6 lg:w-4 lg:h-4 rounded-sm text-[#113F67] group-hover:text-white"></FaFacebookF>
                    </div>
                    <div className="flex justify-center items-center rounded-md bg-[#F3F9FB] p-3 hover:bg-[#113F67] group focus:ring-2 focus:ring-gray-400 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 ease-in-out">
                        <FaYoutube className="w-6 h-6 lg:w-4 lg:h-4  rounded-sm text-[#113F67] group-hover:text-white"></FaYoutube>
                    </div>
                    <div className="flex justify-center items-center rounded-md bg-[#F3F9FB] p-3 hover:bg-[#113F67] group focus:ring-2 focus:ring-gray-400 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 ease-in-out">
                        <FaInstagram className="w-6 h-6 lg:w-4 lg:h-4  rounded-sm text-[#113F67] group-hover:text-white"></FaInstagram>
                    </div>
                </div>
                <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
                <div className="grid grid-cols-2 gap-y-5 items-center justify-between mx-0 lg:mx-16">
                    <div className="col-span-2 lg:col-span-1 text-start">
                        <div className="flex justify-start items-center gap-x-2">
                            <FaLocationDot className="w-4 h-4 rounded-sm text-[#113F67]"></FaLocationDot>
                            <p className="text-md font-normal mb-0 text-gray-900 dark:text-white">Jl. Tegar Beriman, Tengah, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16914</p>
                        </div>
                        <div className="flex justify-start items-center gap-x-2">
                            <FaPhone className="w-4 h-4 rounded-sm text-[#113F67]"></FaPhone>
                            <p className="text-md font-normal mb-0 text-gray-900 dark:text-white">(024) 3513366 – 3515871</p>
                        </div>
                        <div className="flex justify-start items-center gap-x-2">
                            <MdEmail className="w-4 h-4 rounded-sm text-[#113F67]"></MdEmail>
                            <p className="text-md font-normal mb-0 text-gray-900 dark:text-white">muaraenimpemkot@gmail.com</p>
                        </div>
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