import Logo from '../../../atoms/logo';
import useSetting from '../../../hooks/settings/useSettings';
import useFeatureFlags from '../../../hooks/settings/useFeatureFlags';
import Refetch from '../../../atoms/refetch';
import { MainNav } from '../../navigation/main-nav';

function filterMenusByFeatures(menus, features) {
  const isRouteMatch = (route, target) => {
    if (!route) return false;
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
    return normalizedRoute === target;
  };

  return menus
    .map((menu) => {
      if (menu.child && Array.isArray(menu.child) && menu.child.length > 0) {
        const filteredChildren = filterMenusByFeatures(menu.child, features);
        return { ...menu, child: filteredChildren };
      }
      return menu;
    })
    .filter((menu) => {
      if (isRouteMatch(menu.route, "/tour") && !features.tour) return false;
      if (isRouteMatch(menu.route, "/press-release") && !features.pressRelease) return false;
      if (menu.child && Array.isArray(menu.child) && menu.child.length === 0 && !menu.route) {
        return false;
      }
      return true;
    });
}

const AppMenu = () => {
  const { data: menu, isLoading, refetch, isFetching, isError } = useSetting(`menu-${import.meta.env.VITE_VILLAGE_ID}`, {});
  const { isSectionEnabled, pressRelease } = useFeatureFlags();

  const featureFlags = {
    tour: isSectionEnabled("tour"),
    pressRelease: pressRelease,
  };

  const rawMenus = (menu?.value?.length > 0) ? menu.value : [
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
  ];

  const filteredMenus = filterMenusByFeatures(rawMenus, featureFlags);

  return (
        <nav className="flex w-full justify-center bg-[#113F67] dark:bg-gray-900 z-20 top-0 start-0">
            <div className="w-full px-6 py-2 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-wrap items-center justify-between">
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
                        <MainNav menuData={filteredMenus} />
                    )
                }
            </div>
        </nav>
  );
};

export default AppMenu;