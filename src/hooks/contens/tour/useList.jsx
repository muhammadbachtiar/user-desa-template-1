import TourService from "../../../services/controllers/tour/tour.service";
import { useInfiniteQuery } from "@tanstack/react-query";

function useTour( params = {} ) {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetching,
        refetch,
      }  = useInfiniteQuery({
        initialPageParam: null,
        queryKey: ["tours", params],
        queryFn: async ({ pageParam = null }) => {
          return await TourService.getAll(
                { 
                    ...params,
                    cursor: pageParam
                }
            );
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage || !lastPage.meta.next_page_url) {
                return undefined;
            }
             try {
                const url = new URL(lastPage.meta.next_page_url);
                const cursor = url.searchParams.get("cursor");
                return cursor ?? undefined;
            } catch (error) {
                console.error("Error parsing URL:", error);
                return undefined;
            }
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
    };
  }
  
  export default useTour;