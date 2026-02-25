import { useQuery } from "@tanstack/react-query";
import PressReleaseService from "../../../services/controllers/press-release/press-release.service";

function usePressReleaseDetail(params = {}, slug, shouldFetch = true, initialData) {
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
        enabled: shouldFetch,
        initialData: { data: initialData },
    });

    return {
        data: data?.data,
        isLoading,
        isFetching,
        refetch,
        isError,
    };
}

export default usePressReleaseDetail;
