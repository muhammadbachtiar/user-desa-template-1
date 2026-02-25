import { useQuery } from "@tanstack/react-query";
import SettingsService from "../../services/controllers/setting/setting.service";
import kecamatanData from "../../kecamatan.json";

const WEATHER_VILLAGE_ID = 21;

function useWeatherSettings() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["weather-data", WEATHER_VILLAGE_ID],
        queryFn: async () => {
            return await SettingsService.getOneSetting(`weather-data`, {}, { "x-village-id": WEATHER_VILLAGE_ID });
        },
        staleTime: 1000 * 60 * 30,
        retry: 2,
    });

    const settingData = data?.data;
    const kecamatanList = settingData?.value ?? kecamatanData;

    return {
        kecamatanList,
        isLoading,
        isError,
        refetch,
        hasSettingsFromAPI: !!settingData?.value,
    };
}

export default useWeatherSettings;
