import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useSetting from "../../hooks/settings/useSettings";
import Refetch from "../../atoms/refetch";

const Hero = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isFetching, refetch, isError } = useSetting(
    `hero-${import.meta.env.VITE_VILLAGE_ID}`,
    {}
  );

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (data?.value?.title && data?.value?.description) {
      const description = `${data?.value?.title}  ${data?.value?.description}`;
      const metaOgDescription = document.querySelector('meta[property="og:description"]');
      if (metaOgDescription) {
        metaOgDescription.setAttribute("content", description);
      }
    }
  }, [data]);

  const src = data?.value?.videoUrl || "/unavailable-image.png";
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i);
  const hasTextContent = !!(data?.value?.title || data?.value?.description);

  // Search bar component (reused in Mode 1)
  const SearchBar = () => (
    <div className="flex flex-col justify-center items-center px-6 sm:gap-2 space-y-4 sm:justify-center sm:space-y-0 lg:px-36 md:gap-6">
      <div className="flex w-full justify-center">
        <div className="relative max-w-lg w-full">
          <input
            type="search"
            id="search-dropdown"
            onChange={handleChange}
            className="block py-3 px-3 sm:px-5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-3xl rounded-s-3xl border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Apa yang Anda cari?"
            required
          />
          {searchValue ? (
            <Link to={`/search/${searchValue}`}>
              <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-3xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </span>
            </Link>
          ) : (
            <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-3xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <section className="relative h-[85vh] w-full flex justify-center items-center">
        <div className="flex animate-pulse space-x-3 w-full min-h-min">
          <div className="h-dvh w-full flex-1 bg-gray-300"></div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError && !isFetching) {
    return (
      <section className="relative h-[85vh] w-full flex justify-center items-center">
        <Refetch refetch={refetch} />
      </section>
    );
  }

  if (hasTextContent) {
    return (
      <section className="relative h-[85vh] w-full flex justify-center items-center overflow-hidden">
        {/* Background Media */}
        <div className="absolute inset-0 z-0">
          {isVideo ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={src}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* Text Content */}
        <div className="w-full flex justify-center relative z-20">
          <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-4 text-3xl sm:text-5xl font-bold text-white lg:text-6xl sm:px-10 xl:px-12 drop-shadow-lg"
            >
              {data?.value?.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mb-7 text-sm sm:text-base font-normal tracking-tight leading-5 text-white lg:text-xl sm:px-16 xl:px-24 drop-shadow-md"
            >
              {data?.value?.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <SearchBar />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full">
    <div className="absolute inset-0 bg-black/30 z-10"></div>
      <div className="relative w-full">
        {isVideo ? (
          <video
            className="w-full h-auto block"
            autoPlay
            loop
            muted
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={src}
            alt="Hero Image"
            className="w-full h-auto block"
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
