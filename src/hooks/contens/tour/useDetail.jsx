import TourService from "../../../services/controllers/tour/tour.service";
import { useQuery } from "@tanstack/react-query";

function useTourDetail(params = {}, slug ) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery({
        queryKey: ["tour", params],
        queryFn: async () => {
          return await TourService.getOne(slug, params)
        },
      });

    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useTourDetail;