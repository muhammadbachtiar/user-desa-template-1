import { useQuery } from "@tanstack/react-query";
import SettingsService from "../../services/controllers/setting/setting.service";

function useGoogleAnalyticsSettings() {
    const villageId = import.meta.env.VITE_VILLAGE_ID;

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["google-analytics-id", villageId],
        queryFn: async () => {
            return await SettingsService.getOneSetting(`google-analytics-id-${villageId}`);
        },
        staleTime: 1000 * 60 * 30,
        retry: 2,
    });

    const settingData = data?.data;
    const gaId = settingData?.value?.id ?? import.meta.env.VITE_GOOGLE_ANALYTICS_ID ?? '';

    return {
        gaId,
        isLoading,
        isError,
    };
}

export default useGoogleAnalyticsSettings;
