import Logo from '../../../atoms/logo';
import useSetting from '../../../hooks/settings/useSettings';
import Refetch from '../../../atoms/refetch';
import { MainNav } from '../../navigation/main-nav';

const AppMenu = () => {

  const { data: menu, isLoading, refetch, isFetching, isError } = useSetting('menu', {});
 
  return (
       <>
        <nav className="bg-[#113F67] dark:bg-gray-900 w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <Logo/>
                {   
                    isLoading ? (
                        <div className="flex animate-pulse space-x-3">
                            <div className="hidden md:flex flex-row gap-x-6">
                                <div className=" h-4 w-24 rounded bg-gray-200"></div>
                                <div className="h-4 w-24 rounded bg-gray-200"></div>
                                <div className="h-4 w-24 rounded bg-gray-200"></div>
                                <div className="h-4 w-24 rounded bg-gray-200"></div>
                            </div>
                            <div className="flex md:hidden flex-row gap-x-6">
                                <div className="h-10 w-10 rounded-2xl bg-gray-200"></div>
                            </div>
                        </div>
                    )  : isError && !isFetching  ? (
                        <Refetch refetch={refetch} />
                    ) : (
                        <MainNav 
                            menuData={(menu?.value?.length > 0) ? menu.value
                            :  [
                                {
                                    "order": 1,
                                    "title": "Home",
                                    "route": "/",
                                    "staticPage": null,
                                    "child": null
                                },
                                {
                                    "order": 2,
                                    "title": "Artikel",
                                    "route": "/article",
                                    "staticPage": null,
                                    "child": null
                                },
                                {
                                    "order": 3,
                                    "title": "Wisata",
                                    "route": "/tour",
                                    "staticPage": null,
                                    "child": null
                                }
                            ]} 
                        />
                    )
                }
            </div>
        </nav>
       </>
  );
};

export default AppMenu;