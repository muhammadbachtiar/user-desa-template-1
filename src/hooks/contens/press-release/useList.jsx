import { useInfiniteQuery } from "@tanstack/react-query";
import PressReleaseService from "../../../services/controllers/press-release/press-release.service";

function usePressRelease(params = {}, categoryId = 0) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: null,
    queryKey: ["pressreleases", categoryId, params],
    queryFn: async ({ pageParam = null }) => {
      return await PressReleaseService.getAll(
        {
          with: "category",
          ...(categoryId !== 0 && { category: categoryId }),
          ...params,
          cursor: pageParam
        }
      );
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta?.next_page_url) {
        return undefined;
      }
      const url = new URL(lastPage.meta.next_page_url);
      const cursor = url.searchParams.get("cursor");
      return cursor ?? undefined;
    }
  })

  return {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    isError,
    isFetchingNextPage
  };
}

export default usePressRelease;