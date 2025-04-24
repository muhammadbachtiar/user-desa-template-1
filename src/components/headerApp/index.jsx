// import {  useLocation } from 'react-router-dom';
import { createTheme, Drawer, Sidebar } from 'flowbite-react';
import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { HiMenu } from 'react-icons/hi';
import Logo from '../../atoms/logo';
import { Link } from 'react-router-dom';

const AppMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const { pathname } = useLocation();
    const handleClose = () => setIsOpen(false);
    const dataMenu = [
        { 
            order:1,
            title: 'Menu',
            route: '/'
        },
        { 
            order:2,
            title: 'Profile',
            child: [
                { 
                    order:1,
                    title: 'Program Kerja Daerah',
                    route: '/profile/program-kerja-daerah'
                },
                { 
                    order:2,
                    title: 'Visi & Misi',
                    route: '/profile/visi-misi'
                },
                { 
                    order:3,
                    title: 'Sejarah',
                    route: '/profile/sejarah'
                },
                { 
                    order:4,
                    title: 'Struktur',
                    route: '/profile/struktur'
                },
            ]
        },
        { 
            order:3,
            title: 'Service',
            child: [
                { 
                    order:1,
                    title: 'Perizinan',
                    route: '/service/perizinan'
                },
                { 
                    order:2,
                    title: 'Pendidikan',
                    route: '/service/pendidikan'
                },
                { 
                    order:3,
                    title: 'Kependudukan',
                    route: '/service/kependudukan'
                },
                { 
                    order:4,
                    title: 'Pariwisata',
                    route: '/service/pariwisata'
                },
            ]
        },
        { 
            order:4,
            title: 'Artikel',
            route: '/article'
        },
        { 
            order:5,
            title: 'Wisata',
            route: '/tour'
        },
    ]

    const customTheme = createTheme({
        "inner": {
        "closeButton": "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#226597] text-sm text-[#F3F9FB] hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        "closeIcon": "h-8 w-8",
        "titleCloseIcon": "sr-only",
        "titleIcon": "me-2.5 h-8 w-8",
        "titleText": "mb-4 inline-flex items-center text-base font-semibold text-[#F3F9FB] dark:text-gray-400"
        }
    })
  
  return (
       <>
        <nav className="bg-[#113F67] dark:bg-gray-900 w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <Logo/>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button onClick={()=> {setIsOpen(true)}} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex bg-[#113F67] items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:text-gray-800 dark:text-gray-400  dark:focus:ring-gray-600 transition transform hover:scale-110 duration-300 ease-in-out" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="list-none flex flex-col py-1 px-3 m-0 font-medium rounded-lg bg-[#113F67] md:space-x-4 md:flex-row md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {dataMenu.map((menu) => (
                            <li className='my-0' key={menu.order}>
                                {!menu.child ? (
                                    <Link
                                        to={menu.route}
                                        className="block py-2 px-3 text-[#F3F9FB] rounded-t-sm border-b-2 border-[#113F67] hover:border-[#DDA853] hover:bg-[#226597] md:hover:text-[#DDA853] focus:border-[#DDA853] focus:bg-[#226597] md:focus:text-[#DDA853] outline-2 outline-offset-2 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300 ease-in-out"
                                    >
                                        {menu.title}
                                    </Link>
                                ) : (
                                    <Menu>
                                        <MenuButton>
                                            <div
                                                className="text-center inline-flex items-center bg-[#113F67] py-2 px-3 text-[#F3F9FB] border-b-2 border-[#113F67] hover:border-[#DDA853] rounded-t-sm hover:bg-[#226597] md:hover:text-[#DDA853] outline-2 outline-offset-2 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300 ease-in-out"
                                                type="button"
                                            >
                                                {menu.title}
                                                <svg
                                                    className="w-2.5 h-2.5 ms-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 10 6"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 4 4 4-4"
                                                    />
                                                </svg>
                                            </div>
                                        </MenuButton>
                                        <MenuItems className="absolute z-50 rounded-sm w-fit px-4 py-2 border-t-4 border-[#DDA853] bg-[#113F67]">
                                            {menu.child.map((submenu) => (
                                                <MenuItem key={submenu.order}>
                                                    <Link
                                                        to={submenu.route}
                                                        className="block rounded-sm px-2 py-1 font-normal text-white data-[focus]:bg-[#226597] hover:text-[#DDA853]"
                                                    >
                                                        {submenu.title}
                                                    </Link>
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <Drawer className='bg-[#113F67] ' backdrop={true} open={isOpen} onClose={handleClose}>
                    <Drawer.Header theme={customTheme} titleIcon={HiMenu} title={
                    <div className='flex flex-col gap-2'>
                        <span className="self-start align-baseline text-xl leading-3 tracking-tighter font-semibold uppercase text-[#F3F9FB]">Muara Enim</span>
                        <span className="self-start align-baseline text-xs leading-3 font-normal italic text-[#F3F9FB]">Serasan Sekundang</span>
                    </div>} />
                    <Drawer.Items>
                        <Sidebar
                            aria-label="Sidebar with multi-level dropdown example"
                            className="[&>div]:bg-transparent [&>div]:p-0"
                        >
                            <div className="flex h-full flex-col justify-between py-2">
                            <div>
                                <Sidebar.Items>
                                    <Sidebar.ItemGroup>
                                        <ul className="list-none flex flex-col mt-4 py-2 px-3 font-medium rounded-lg bg-[#113F67] md:space-x-4 md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                            {dataMenu.map((menu) => (
                                                <li key={menu.order}>
                                                    {!menu.child ? (
                                                        <Link
                                                            to={menu.route}
                                                            className="block py-2 px-3 w-full text-[#F3F9FB] rounded-t-sm border-b-2 border-[#113F67] hover:border-[#DDA853] hover:bg-[#226597] md:hover:text-[#DDA853] focus:border-[#DDA853] focus:bg-[#226597] md:focus:text-[#DDA853] outline-2 outline-offset-2 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300 ease-in-out"
                                                        >
                                                            {menu.title}
                                                        </Link>
                                                    ) : (
                                                        <Disclosure>
                                                            <DisclosureButton className="w-full">
                                                                <button
                                                                    className="text-center inline-flex items-center w-full bg-[#113F67] py-2 px-3 text-[#F3F9FB] border-b-2 border-[#113F67] hover:border-[#DDA853] rounded-t-sm hover:bg-[#226597] hover:text-[#DDA853] outline-2 outline-offset-2 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300 ease-in-out"
                                                                    type="button"
                                                                >
                                                                    {menu.title}
                                                                    <svg
                                                                        className="w-2.5 h-2.5 ms-3"
                                                                        aria-hidden="true"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 10 6"
                                                                    >
                                                                        <path
                                                                            stroke="currentColor"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="m1 1 4 4 4-4"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </DisclosureButton>
                                                            <DisclosurePanel>
                                                                <ul className="list-none py-2 ms-3 text-md text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                                    {menu.child.map((submenu) => (
                                                                        <li key={submenu.order}>
                                                                            <Link
                                                                                to={submenu.route}
                                                                                className="block rounded-sm px-2 py-1 font-normal text-white data-[focus]:bg-[#226597] hover:text-[#DDA853]"
                                                                            >
                                                                                {submenu.title}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </DisclosurePanel>
                                                        </Disclosure>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                            </div>
                            </div>
                        </Sidebar>
                    </Drawer.Items>
                </Drawer>
            </div>
        </nav>
       </>
  );
};

export default AppMenu;