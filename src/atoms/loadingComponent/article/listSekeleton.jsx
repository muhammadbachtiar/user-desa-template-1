import ArticleCardSkeleton from "./cardSekeleton";

const ArticleListSkeleton = () => {
  return (
    <>
      <div className="col-span-6  w-full grid grid-cols-6 px-8 md:px-0 gap-6 justify-items-center">
        <div className="col-span-6 px-0 md:px-3 md:col-span-3 lg:col-span-2 w-full">
          <ArticleCardSkeleton/>
        </div>
        <div className="col-span-6 px-0 md:px-3 md:col-span-3 lg:col-span-2 w-full">
          <ArticleCardSkeleton/>
        </div>
        <div className="col-span-6 px-0 md:px-3 md:col-span-3 lg:col-span-2 w-full">
          <ArticleCardSkeleton/>
        </div>
        <div className="col-span-6 px-0 md:px-3 md:col-span-3 lg:col-span-2 w-full">
          <ArticleCardSkeleton/>
        </div>
        <div className="col-span-6 px-0 md:px-3 md:col-span-3 lg:col-span-2 w-full">
          <ArticleCardSkeleton/>
        </div>
        <div className="col-span-6 px-0 md:px-3 md:col-span-3 lg:col-span-2 w-full">
          <ArticleCardSkeleton/>
        </div>
      </div>
    </>
  );
};

export default ArticleListSkeleton;