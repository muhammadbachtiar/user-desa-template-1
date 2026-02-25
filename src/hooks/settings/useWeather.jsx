import { useQuery } from "@tanstack/react-query";

async function fetchWeather(adm4) {
    const response = await fetch(
        `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    return response.json();
}

export function useWeather(adm4) {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["weather", adm4],
        queryFn: () => fetchWeather(adm4),
        enabled: !!adm4,
        staleTime: 1000 * 60 * 30,
        refetchInterval: 1000 * 60 * 30,
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
}

export default useWeather;
