import ArticleBanner from "../../components/banner/article";
import InfografisBanner from "../../components/banner/infografis";
import TourBanner from "../../components/banner/tour";
import Hero from "../../components/banner/hero";
import App from "../../components/banner/app";
import Profile from "../../components/banner/profile";
import DynamicInstagramFeed from "../../components/banner/DynamicInstagramFeed";
import useSetting from "../../hooks/settings/useSettings";
import useFeatureFlags from "../../hooks/settings/useFeatureFlags";
import { useEffect } from "react";

const SECTION_COMPONENTS = {
  service: App,
  dynamic_section: Profile,
  news: ArticleBanner,
  infografis: InfografisBanner,
  instagram: DynamicInstagramFeed,
  tour: TourBanner,
};

const FALLBACK_ORDER = [
  "service",
  "dynamic_section",
  "news",
  "infografis",
  "instagram",
  "tour",
];

const MainPage = () => {
  const { data: logo } = useSetting(
    `logo-${import.meta.env.VITE_VILLAGE_ID}`,
    {}
  );

  const {
    sectionsOrder,
    isLoading: isFeaturesLoading,
    isError: isFeaturesError,
    isSectionEnabled,
  } = useFeatureFlags();

  useEffect(() => {
    if (logo?.value?.regionEntity) {
      const tittle =
        logo?.value?.regionEntity || "Pemerintah Kabupaten Muara Enim";
      document.title = tittle;
      const metaOgTittle = document.querySelector('meta[property="og:title"]');

      if (metaOgTittle) {
        metaOgTittle.setAttribute("content", tittle);
      }
    }
  }, [logo]);

  const renderSections = (() => {
    if (isFeaturesLoading || isFeaturesError || sectionsOrder.length === 0) {
      return FALLBACK_ORDER.map((key) => ({ key, enabled: true, order: 0 }));
    }
    return sectionsOrder.filter((s) => s.enabled);
  })();

  return (
    <>
      <Hero />
      <div className="w-full flex justify-center">
        <div className="w-full px-6 py-1 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-full overflow-hidden bg-slate-100 flex flex-col items-center content-center gap-12">
          {renderSections.map((section) => {
            const Component = SECTION_COMPONENTS[section.key];
            if (!Component) return null;
            return (
              <div className="w-full" key={section.key}>
                <Component />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MainPage;
