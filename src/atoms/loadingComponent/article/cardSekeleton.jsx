import Skeleton from "react-loading-skeleton";

const ArticleCardSkeleton = () => {
  return (
    <>
        <Skeleton baseColor="#595E6B" height={100}/>
        <Skeleton baseColor="#595E6B" height={10}/>
        <Skeleton baseColor="#595E6B" height={5}/>
        <Skeleton baseColor="#595E6B" height={5}/>
        <Skeleton baseColor="#595E6B" height={5}/>
        <Skeleton baseColor="#595E6B" height={5}/>
    </>
  );
};

export default ArticleCardSkeleton;