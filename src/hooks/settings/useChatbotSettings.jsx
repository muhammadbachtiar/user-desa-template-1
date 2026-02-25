import { useQuery } from "@tanstack/react-query";
import SettingsService from "../../services/controllers/setting/setting.service";

const CHATBOT_VILLAGE_ID = 21;

function useChatbotSettings() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["chatbot-token", CHATBOT_VILLAGE_ID],
        queryFn: async () => {
            return await SettingsService.getOneSetting(`chatbot-token`, {}, { "x-village-id": CHATBOT_VILLAGE_ID });
        },
        staleTime: 1000 * 60 * 30,
        retry: 2,
    });

    const settingData = data?.data;

    const chatbotId = settingData?.value?.id ?? import.meta.env.VITE_CHATBOT_ID ?? '';
    const chatbotUrl = settingData?.value?.url ?? import.meta.env.VITE_CHATBOT_BASE_URL ?? '';

    return {
        chatbotId,
        chatbotUrl,
        isLoading,
        isError,
        refetch,
        hasSettingsFromAPI: !!settingData?.value,
    };
}

export default useChatbotSettings;
