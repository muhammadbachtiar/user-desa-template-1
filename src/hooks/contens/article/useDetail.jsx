import { useQuery } from "@tanstack/react-query";
import ArticleService from "../../../services/controllers/article/article.service";

function useArticleDetail(params = {}, slug, shouldFetch = true, initialData) {
    const hasInitialData = initialData && typeof initialData === 'object' && Object.keys(initialData).length > 0;

    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } =  useQuery({
        queryKey: ["article", slug, params],
        queryFn: async () => {
          return await ArticleService.getOne(slug, params)
        },
        enabled: Boolean(slug) && shouldFetch,
        ...(hasInitialData && { initialData: { data: initialData } }),
      })

    const article = data?.data ?? (data && typeof data === 'object' && !Array.isArray(data) && (data.id || data.title) ? data : undefined);

    return {
      data: article,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useArticleDetail;