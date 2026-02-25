import { useQuery } from "@tanstack/react-query";
import useSetting from "./useSettings";
import SettingsService from "../../services/controllers/setting/setting.service";

const villageId = import.meta.env.VITE_VILLAGE_ID;

const DEFAULT_SECTIONS = [
    {
        id: "welcome",
        title: "Kata Sambutan",
        slug: `wellcome-message-${villageId}`,
        order: 1,
        enabled: true,
    },
    {
        id: "program",
        title: "Program",
        slug: `village-program-${villageId}`,
        order: 2,
        enabled: true,
    },
];

const EMPTY_CONTENT_MESSAGE = "<p class='text-gray-400 italic p-4'>Konten belum diatur</p>";

async function fetchSectionContent(slug) {
    try {
        const response = await SettingsService.getOneStaticPage(slug);
        const content = response?.data?.content;
        return content && content.trim() !== "" ? content : EMPTY_CONTENT_MESSAGE;
    } catch {
        return EMPTY_CONTENT_MESSAGE;
    }
}

async function fetchAllSectionsContent(sections) {
    const enabledSections = sections
        .filter((s) => s.enabled)
        .sort((a, b) => a.order - b.order);

    const results = await Promise.all(
        enabledSections.map(async (config) => ({
            config,
            content: await fetchSectionContent(config.slug),
        }))
    );

    return results;
}

export function useDynamicSections() {
    const { data: settingData, isLoading: isSettingLoading } = useSetting(
        `dynamic-sections-${villageId}`,
        {}
    );

    const sectionsConfig = settingData?.value?.sections || DEFAULT_SECTIONS;

    const {
        data: sectionsData,
        isLoading: isContentLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["dynamic-sections-content", sectionsConfig],
        queryFn: () => fetchAllSectionsContent(sectionsConfig),
        enabled: !isSettingLoading && sectionsConfig.length > 0,
        staleTime: 1000 * 60 * 30,
    });

    return {
        sections: sectionsData || [],
        isLoading: isSettingLoading || isContentLoading,
        isError,
        refetch,
        hasCustomConfig: !!settingData?.value?.sections,
    };
}

export default useDynamicSections;
