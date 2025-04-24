import { Link } from "react-router-dom";

const TourBanner = () => {
  
  return (
       <>
        <div className="col-span-4 grid grid-cols-6 my-4 px-6 lg:px-12 justify-items-center">
                <div className="col-span-6 md:col-span-3 xl:col-span-4 w-full rounded-lg dark:bg-gray-800 py-4 lg:py-12 pe-12">                  
                    <h5 className="text-4xl font-bold mb-5 tracking-tighter text-gray-900 dark:text-white">Pojok Wisata</h5>
                    <div className="flex items-center mt-2">
                        <p className="my-0 text-lg font-semibold text-gray-900 dark:text-white">Nikmati Pesona Alam & Budaya Tanpa Batas</p>
                    </div>
                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mt-2">Rasakan keseruan petualangan yang penuh warna! Jelajahi tempat-tempat indah, kuliner khas, dan budaya yang memikat. Dari perjalanan santai hingga ekspedisi penuh tantangan, temukan berbagai destinasi wisata.</p>
                    <Link to={'/tour'} className="inline-flex justify-center mt-8 lg:mt-12 hover:text-black items-center py-5 px-8 text-base font-medium text-center bg-[#113F67] text-white rounded-md hover:bg-white focus:ring-2 focus:ring-gray-400 transition transform duration-300 ease-in-out">
                        Lihat Selengkapnya
                    </Link>
                </div>
                <div className="col-span-6 md:col-span-3 xl:col-span-2 flex justify-center items-center dark:bg-gray-800">                  
                    <img
                        className="h-full w-full shadow-2xl backdrop-blur-2xl"
                        src="https://www.trendwisata.com/wp-content/uploads/2023/05/1fdc0f893412ce55f0d2811821b84d3b-177.jpg"
                        alt="image description"
                    />
                </div>
            </div>
       </>
  );
};

export default TourBanner;