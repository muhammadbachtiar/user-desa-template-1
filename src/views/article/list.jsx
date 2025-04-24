import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArticleCard from "../../atoms/ArticleCard";
import SelectCategory from "../../atoms/form/selectCategory";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useState } from "react";
import ArticleService from "../../services/controllers/article/article.service";
import { Button } from "flowbite-react";
import { LuRefreshCcw } from "react-icons/lu";
import ArticleListSkeleton from "../../atoms/loadingComponent/article/listSekeleton";
import { BiPlus } from "react-icons/bi";

const ArticleList = () => {

    const [categoryId, setCategoryId] = useState(0);
    const [search, setSearch] = useState('');

     const {
            data: articles,
            isLoading,
            isError,
            fetchNextPage,
            hasNextPage,
            isFetching,
            refetch,
          } = useInfiniteQuery({
            queryKey: ["articles", categoryId, search],
            queryFn: async ({ pageParam = null }) => {
             
              return await ArticleService.getAll(
                    { 
                        with:"category", 
                        ...(categoryId !== 0 && { category: categoryId }),
                        search, 
                        page_size: 6,
                        cursor: pageParam
                    }
                );
            },
            getNextPageParam: (lastPage) => {
                if (!lastPage.meta.next_page_url) {
                    return undefined;
                }
                const url = new URL(lastPage.meta.next_page_url);
                const cursor = url.searchParams.get("cursor");
                return cursor ?? undefined;
            }
          });

        const handleChange = (e) => {
            setSearch(e.target.value);
        };
        
        const allArticles = articles?.pages.flatMap(page => page.data) || [];
  return (
    <>  
        <section className="relative bg-[url(/muara-enim-skyline.jpg)] p-4 lg:p-14 bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 flex justify-start items-end">
            <div className="absolute inset-0 bg-black/50 rounded-s-md"></div>
            <div className="relative z-10 px-8 text-start">
                <h2 className="mb-4 text-5xl font-bold text-white lg:text-6xl">Artikel</h2>
            </div>
        </section>
        <div className="grid w-full grid-cols-3 lg:grid-cols-4 gap-y-6 bg-gradient-to-b from-slate-100 via-blue-[#F3F9FB] to-blue-[#F3F9FB]">
            <div className="bg-transparent rounded-s-md col-span-4 lg:py-6 md:px-12 grid grid-cols-6">    
                <div className="col-span-6 grid grid-cols-6 gap-8">
                    <div className="col-span-6 grid grid-cols-6 gap-1 px-6 md:px-0 justify-between">
                        <div className="col-span-6 md:col-span-2 lg:col-span-1">
                            <SelectCategory setCategoryId={setCategoryId}/>
                        </div>
                        <div className="col-span-6 md:col-span-4 lg:col-span-5 text-end">
                            <div className="relative w-full">
                                <input type="search" id="search-dropdown"value={search} onChange={handleChange} className="block px-5 w-full rounded-sm text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Cari judul ..." />
                                <span type="submit" className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 grid grid-cols-6 md:gap-x-4 gap-y-6 justify-items-center">
                        {isLoading ? (
                            <ArticleListSkeleton/>
                        ) : isError && !isFetching && !articles || articles.data?.length === 0 ? (
                            <div className="flex col-span-6 w-full h-full justify-center">
                                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400">Data tidak tersedia</p>
                                </div>
                            </div>
                        ) : isError && !isFetching  ? (
                            <div className="w-full col-span-6 h-full flex justify-center">
                                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400">Terjadi kesalahan, silakan ulangi</p>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            refetch();
                                        }}
                                    >
                                        <LuRefreshCcw size={24} />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {allArticles.map((card) => 
                                    <Link to={`/article/${card.slug}`} tabIndex={1} key={card.slug} className="col-span-6 md:col-span-3 px-3 md:px-0 lg:col-span-2 w-full">
                                        <ArticleCard thumbnail={card.thumbnail} title={card.title} description={card.description} category={card.category.name} published_at={card.published_at} />  
                                    </Link>
                                )}
                                <div className="col-span-6">
                                    <button 
                                        className="inline-flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-transparent text-gray-900 focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:text-gray-400 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase" 
                                        onClick={() => fetchNextPage()} 
                                        disabled={!hasNextPage || isFetching}
                                    >
                                        Tampilkan lebih banyak
                                        <BiPlus />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default ArticleList;
