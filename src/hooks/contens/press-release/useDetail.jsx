import { useQuery } from "@tanstack/react-query";
import PressReleaseService from "../../../services/controllers/press-release/press-release.service";

function usePressReleaseDetail(params = {}, slug, shouldFetch = true, initialData) {
    const hasInitialData = initialData && typeof initialData === 'object' && Object.keys(initialData).length > 0;

    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["press-release", slug, params],
        queryFn: async () => {
            return await PressReleaseService.getOne(slug, params);
        },
        enabled: Boolean(slug) && shouldFetch,
        ...(hasInitialData && { initialData: { data: initialData } }),
    });

    const pressRelease = data?.data ?? (data && typeof data === 'object' && !Array.isArray(data) && (data.id || data.title) ? data : undefined);

    return {
        data: pressRelease,
        isLoading,
        isFetching,
        refetch,
        isError,
    };
}

export default usePressReleaseDetail;
