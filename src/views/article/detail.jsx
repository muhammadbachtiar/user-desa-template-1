import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArticleService from "../../services/controllers/article/article.service";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ArticleDetailSkeleton from "../../atoms/loadingComponent/article/detailSekeleton";
import { Button } from "flowbite-react";
import { LuRefreshCcw } from "react-icons/lu";
import ThumbnailBanner from "../../atoms/ThumbnailBanner";

const ArticleDetail = () => {
    const { slug } = useParams();
    const {
        data: article,
        isLoading: isLoadingArticle,
        isError: isErrorArticle,
        isFetching: isFetchingArticle,
        refetch: refetchArticle,
      } = useQuery({
        queryKey: ["article", slug],
        enabled: !!slug,
        queryFn: async () => {
          return await ArticleService.getOne(slug, {with:"user,category"});
        },
      });

  return (
    <>  
        <div className="min-h-screen w-full">
            {isLoadingArticle ? (
                <ArticleDetailSkeleton/>
            ) : isErrorArticle && !isFetchingArticle && !article || Object.keys(article.data || {}).length === 0 ? (
                <div className="flex w-full h-full justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Data tidak tersedia</p>
                    </div>
                </div>
            ) : isErrorArticle && !isFetchingArticle  ? (
                <div className="w-full h-full flex justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Terjadi kesalahan, silakan ulangi</p>
                        <Button
                            size="sm"
                            onClick={() => {
                                refetchArticle();
                            }}
                        >
                            <LuRefreshCcw size={24} />
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <ThumbnailBanner bgUrl={`${article.data.thumbnail}`}/>
                    <div className="pt-12 px-4 md:px-32 min-h-screen bg-[#F3F9FB]">
                        <h5 className="my-2 text-4xl text-center font-bold tracking-tight text-gray-900  dark:text-white">{article.data.title}</h5>
                        <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700"></hr>
                        <div className='flex flex-row w-full my-2 gap-1 justify-items-start justify-center'>
                            <div className="flex flex-row">
                                <span className="self-center align-baseline text-base font-semibold uppercase text-[#DDA853]">{ article.data.category.name }</span>
                                <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                                <span className="self-center align-baseline text-xs font-medium text-black">{article.data.user.name}</span>
                                <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                                <span className="self-center align-baseline text-xs font-medium text-black">{article.data.published_at}</span>
                            </div>
                        </div>
                        <div className="px-4 md:px-12 mt-20" dangerouslySetInnerHTML={{ __html: article.data.content }} />
                        <div className='flex flex-row w-full my-3 px-8 gap-1 justify-items-start justify-end'>
                            <div className="flex flex-row">
                                <p className="text-gray-500 dark:text-gray-400">Dilihat <strong className="font-semibold text-gray-900 dark:text-white">{article.data.views}</strong> kali</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
      </div>
    </>
  );
};

export default ArticleDetail;
