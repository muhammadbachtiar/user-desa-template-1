import Skeleton from "react-loading-skeleton";

const ArticleDetailSkeleton = () => {
  return (
    <>
        <div className="pt-12 px-4 md:px-32 w-full min-h-screen bg-[#F3F9FB]">
            <Skeleton baseColor="#595E6B" height={300}/>
            <h5 className="my-2 text-4xl text-center font-bold tracking-tight text-gray-900  dark:text-white"><Skeleton baseColor="#595E6B" height={10}/></h5>
            <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700"></hr>
            <div className='flex flex-row w-full my-2 gap-1 justify-items-start justify-center'>
                <div className="flex flex-row">
                    <span className="self-center align-baseline text-base font-semibold uppercase text-[#DDA853]"> <Skeleton baseColor="#595E6B" width={80} height={10}/></span>
                    <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                    <span className="self-center align-baseline text-xs font-medium text-black"><Skeleton baseColor="#595E6B" width={80} height={10}/></span>
                    <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                    <span className="self-center align-baseline text-xs font-medium text-black"><Skeleton baseColor="#595E6B" width={80} height={10}/></span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Skeleton baseColor="#595E6B" height={10} />
              <Skeleton baseColor="#595E6B" height={10} />
              <Skeleton baseColor="#595E6B" height={10} />
              <Skeleton baseColor="#595E6B" height={10} />
              <Skeleton baseColor="#595E6B" height={10} />
              <Skeleton baseColor="#595E6B" height={10} />
            </div>
            <div className='flex flex-row w-full my-3 gap-1 justify-items-start justify-end'>
                <div className="flex flex-row">
                  <Skeleton baseColor="#595E6B" width={200} height={10}/>
                </div>
            </div>
        </div>
    </>
  );
};

export default ArticleDetailSkeleton;