import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import { BiPlus } from "react-icons/bi";
import usePressRelease from "../../hooks/contens/press-release/useList";
import useFeatureFlags from "../../hooks/settings/useFeatureFlags";
import DatePicker from "../../components/shared/form/DatePicker";
import Refetch from "../../atoms/refetch";

const PressReleaseList = () => {
  const navigate = useNavigate();
  const { pressRelease, isLoading: isFeaturesLoading } = useFeatureFlags();

  const [search, setSearch] = useState("");
  const [dateRange, setRangeDate] = useState("");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = usePressRelease(
    {
      page: 1,
      page_size: 9,
      search: search,
      date: dateRange,
      by: "published_at",
    },
    0
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const allPressReleases =
    data?.pages.filter((page) => page?.data).flatMap((page) => page.data) ||
    [];

  // Feature handling
  useEffect(() => {
    if (!isFeaturesLoading && !pressRelease) {
      navigate("/", { replace: true });
    }
  }, [isFeaturesLoading, pressRelease, navigate]);

  if (!isFeaturesLoading && !pressRelease) return null;

  if (isFeaturesLoading) {
    return (
       <div className="flex justify-center items-center min-h-screen w-full">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#113F67]"></div>
       </div>
    );
  }

  return (
    <>
      <div className="w-full my-4 flex justify-center">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl grid grid-cols-3 lg:grid-cols-4 gap-y-6 bg-gradient-to-b from-slate-100 via-blue-[#F3F9FB] to-blue-[#F3F9FB]">
          <div className="bg-transparent rounded-s-md col-span-4 grid grid-cols-6">
            <div className="col-span-6 grid grid-cols-6 gap-8">
              <div className="col-span-6 grid grid-cols-6 gap-1 px-6 md:px-0 justify-between">
                <div className="col-span-6  text-end">
                  <div className="relative w-full">
                    <input
                      type="search"
                      id="search-dropdown"
                      value={search}
                      onChange={handleChange}
                      className="block px-5 pe-12 w-full rounded-sm text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Cari siaran pers..."
                    />
                    <span
                      className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="col-span-6 mt-2">
                  <DatePicker setDate={setRangeDate} dateRange={dateRange} />
                </div>
              </div>
              <div className="col-span-6 grid grid-cols-6 gap-y-6 justify-items-center">
                {isLoading ||
                ((!data ||
                  !data.pages[0] ||
                  data.pages[0]?.data.length === 0) &&
                  isFetching) ? (
                  <div className="col-span-6 w-full grid grid-cols-6 px-8 md:px-0 gap-6 justify-items-center">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="col-span-6 px-0 md:px-3 md:col-span-3 lg:col-span-2 w-full"
                      >
                        <div className=" w-full bg-gray-400 dark:bg-gray-600 rounded animate-pulse">
                          <div className="h-24 w-full bg-gray-400 dark:bg-gray-600 rounded"></div>
                          <div className="h-10 w-3/4 bg-gray-400 dark:bg-gray-600 rounded"></div>
                          <div className="h-5 w-2/4 bg-gray-400 dark:bg-gray-600 rounded"></div>
                          <div className="h-5 w-2/4 bg-gray-400 dark:bg-gray-600 rounded"></div>
                          <div className="h-5 w-1/3 bg-gray-400 dark:bg-gray-600 rounded"></div>
                          <div className="h-5 w-1/3 bg-gray-400 dark:bg-gray-600 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : !isError &&
                  !isFetching &&
                  (!data ||
                    !data.pages[0] ||
                    data.pages[0]?.data.length === 0) ? (
                  <div className="flex col-span-6 w-full h-full justify-center">
                    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2">
                      <p className="text-black text-2xl dark:text-gray-400">
                        Siaran pers tidak tersedia
                      </p>
                    </div>
                  </div>
                ) : isError && !isFetching ? (
                  <div className="w-full col-span-6 h-full flex justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                      <Refetch refetch={refetch} />
                    </div>
                  </div>
                ) : (
                  <>
                    {allPressReleases.map((card) => (
                      <Link
                        to={`/press-release/${card.slug}`}
                        tabIndex={1}
                        key={card.id}
                        className="col-span-6 md:col-span-3 px-3 md:px-0 lg:col-span-2 w-full"
                      >
                        <PressReleaseCard
                          thumbnail={card.thumbnail}
                          title={card.title}
                          description={card.description}
                          category={card.category?.name}
                          published_at={card.published_at}
                          author={card.user?.name}
                        />
                      </Link>
                    ))}
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
      </div>
    </>
  );
};

/** Press Release Card — same pattern as ArticleCard */
function PressReleaseCard({ thumbnail, title, description, category, published_at, author }) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 h-full">
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={thumbnail || "/unavailable-image.png"}
          alt={title}
          loading="lazy"
        />
        {category && (
          <span className="absolute top-2 left-2 bg-[#113F67] text-white text-xs font-semibold px-2 py-1 rounded">
            {category}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h5>
        <p className="mb-3 text-sm font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
           <span>{moment(published_at ?? "")
                                    .locale("id")
                                    .format("dddd, D MMMM YYYY")}</span>
          {author && <span className="font-medium text-gray-500">{author}</span>}
        </div>
      </div>
    </div>
  );
}

export default PressReleaseList;
