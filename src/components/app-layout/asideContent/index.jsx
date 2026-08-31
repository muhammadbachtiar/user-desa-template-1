import useArticle from "../../../hooks/contens/article/useList";
import PropTypes from "prop-types";
import Refetch from "../../../atoms/refetch";
import { Link } from "react-router-dom";
import SliderInfografis from "../../../atoms/slider";

export default function AsideContent({ children }) {
  const {
    data: articles,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useArticle({ page_size: 5, order: "desc", by: "views" });

  return (
    <div className="flex w-full justify-center py-4">
      <div className="w-full px-4 sm:px-6 md:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col items-stretch md:flex-row gap-6 md:gap-0">
        {/* ─── Main Content ─── */}
        <main className="flex-1 min-w-0 md:pe-6">
          <div className="space-y-6">
            <div className="mb-8">{children}</div>
          </div>
        </main>

        {/* ─── Sidebar ─── */}
        <aside className="w-full md:w-72 lg:w-80 xl:w-[340px] flex-shrink-0 md:ps-6 lg:sticky lg:top-0 border-t md:border-t-0 md:border-l border-gray-200">
          <div className="space-y-8 sticky top-4 self-start h-fit pt-4 md:pt-0">

            {/* ── Artikel Populer ── */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-[#113F67]">
                <div className="w-1 h-5 bg-[#DDA853] rounded-full" />
                <h2 className="text-base sm:text-lg font-bold text-[#113F67] uppercase tracking-wide">
                  Artikel Populer
                </h2>
              </div>
              <ul className="space-y-0 divide-y divide-gray-100">
                {isLoading ||
                  ((!articles ||
                    !articles.pages[0] ||
                    articles.pages[0]?.data.length === 0) &&
                    isFetching) ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <li key={index} className="flex animate-pulse py-3 gap-3">
                      <div className="flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-md bg-gray-200" />
                      <div className="flex-1 flex flex-col gap-2 justify-center">
                        <div className="h-3 w-full bg-gray-200 rounded" />
                        <div className="h-3 w-3/4 bg-gray-200 rounded" />
                        <div className="h-2.5 w-16 bg-gray-100 rounded" />
                      </div>
                    </li>
                  ))
                ) : !isError &&
                  !isFetching &&
                  (!articles ||
                    !articles.pages[0] ||
                    articles.pages[0]?.data.length === 0) ? (
                  <div className="flex min-h-40 justify-center items-center w-full">
                    <p className="text-gray-400 text-center text-sm">
                      Artikel tidak tersedia
                    </p>
                  </div>
                ) : isError && !isFetching ? (
                  <div className="flex min-h-40 justify-center items-center w-full">
                    <Refetch refetch={refetch} />
                  </div>
                ) : (
                  articles?.pages[0].data.map((article, index) => (
                    <Link key={article.id} to={`/article/${article.slug}`}>
                      <li className="flex py-3 gap-3 group cursor-pointer hover:bg-gray-50/60 transition-colors duration-200 rounded-md -mx-1 px-1">

                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 relative rounded-md overflow-hidden bg-gray-100">
                          <img
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            src={article.thumbnail || "/unavailable-image.png"}
                            alt={article.title}
                            loading="lazy"
                          />
                        </div>

                        {/* Text content */}
                        <div className="flex-1 flex flex-col justify-center min-w-0 gap-0.5">
                          <p className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-[#113F67] transition-colors duration-200">
                            {article.title}
                          </p>
                          {article.published_at && (
                            <span className="text-[10px] sm:text-xs text-gray-400 leading-tight">
                              {article.published_at}
                            </span>
                          )}
                        </div>
                      </li>
                    </Link>
                  ))
                )}
              </ul>
            </div>

            {/* ── Infografis ── */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-[#113F67]">
                <div className="w-1 h-5 bg-[#DDA853] rounded-full" />
                <h2 className="text-base sm:text-lg font-bold text-[#113F67] uppercase tracking-wide">
                  Infografis
                </h2>
              </div>
              <div className="rounded-lg overflow-hidden">
                <SliderInfografis useButton={false} useDots={false} />
              </div>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}

AsideContent.propTypes = {
  children: PropTypes.node.isRequired,
};
