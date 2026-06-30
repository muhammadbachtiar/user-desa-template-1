import { useQuery } from "@tanstack/react-query";
import SettingsService from "../../services/controllers/setting/setting.service";

const GMAPS_VILLAGE_ID = 21;

function useGmapsSettings() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["gmaps-token", GMAPS_VILLAGE_ID],
        queryFn: async () => {
            return await SettingsService.getOneSetting(`gmaps-token`, {}, { "x-village-id": GMAPS_VILLAGE_ID });
        },
        staleTime: 1000 * 60 * 30,
        retry: 2,
    });

    const settingData = data?.data;

    const gmapsApiKey = settingData?.value?.token ?? import.meta.env.VITE_GMAPS_API_KEY ?? '';

    return {
        gmapsApiKey,
        isLoading,
        isError,
        refetch,
        hasSettingsFromAPI: !!settingData?.value,
    };
}

export default useGmapsSettings;
