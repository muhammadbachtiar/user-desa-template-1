import useSetting from "./useSettings";

const DEFAULT_SECTIONS_ORDER = [
    { key: "dynamic_section", enabled: true, order: 1 },
    { key: "service", enabled: true, order: 2 },
    { key: "news", enabled: true, order: 3 },
    { key: "instagram", enabled: true, order: 4 },
    { key: "infografis", enabled: true, order: 5 },
    { key: "tour", enabled: true, order: 6 },
];

const NON_OPTIONAL_SECTIONS = ["news", "infografis"];

export function useFeatureFlags() {
    const villageId = import.meta.env.VITE_VILLAGE_ID;

    const { data: settingData, isLoading, isError } = useSetting(`features-${villageId}`, {});

    const settingValue = settingData?.value || {};
    const apiSectionsOrder = settingValue.sectionsOrder || [];

    const getSortedSections = () => {
        const baseSections = apiSectionsOrder.length > 0 ? apiSectionsOrder : DEFAULT_SECTIONS_ORDER;

        return baseSections
            .map((section) => ({
                ...section,
                enabled: NON_OPTIONAL_SECTIONS.includes(section.key) ? true : section.enabled,
            }))
            .sort((a, b) => a.order - b.order);
    };

    const sectionsOrder = getSortedSections();

    const isSectionEnabled = (key) => {
        if (NON_OPTIONAL_SECTIONS.includes(key)) return true;
        const section = sectionsOrder.find((s) => s.key === key);
        return section?.enabled ?? true;
    };

    return {
        pressRelease: settingValue.pressRelease ?? true,
        sectionsOrder,
        isLoading,
        isError,
        isSectionEnabled,
    };
}

export default useFeatureFlags;
