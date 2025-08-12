import { useParams } from "react-router-dom";
import { CiMap } from "react-icons/ci";
import { BiGlobe } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import sosmedIcons from "../../atoms/icons/sosmed";
import useTourDetail from "../../hooks/contens/tour/useDetail";
import Refetch from "../../atoms/refetch";
import StreetViewChecker from "../../services/utils/checkStreetView";

const TourDetail = () => {
  const { slug } = useParams();
  const gmapsApiKey = import.meta.env.VITE_GMAPS_API_KEY;
  const {
    data: tour,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useTourDetail({}, String(slug));
  const isStreetAvailable = StreetViewChecker({
    lat: Number(tour?.latitude),
    lng: Number(tour?.longitude),
  });
  let mapsUrl = `https://www.google.com/maps/embed/v1/place?key=${gmapsApiKey}&q=${tour?.latitude},${tour?.longitude}`;
  if (isStreetAvailable) {
    mapsUrl = `https://www.google.com/maps/embed/v1/streetview?key=${gmapsApiKey}&location=${tour?.latitude},${tour?.longitude}&heading=0&pitch=0`;
  }

  return (
    <>
      <div className="min-h-screen w-full flex justify-center flex-col items-center">
        {isLoading ||
        ((!tour || Object.keys(tour || {}).length === 0) && isFetching) ? (
          <div className="pt-12 px-4 md:px-32 w-full min-h-screen bg-[#F3F9FB]">
            <div className="h-72 w-full bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
            <h5 className="my-2 text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              <div className="h-2.5 w-full bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
            </h5>
            <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700"></hr>
            <div className="flex flex-row w-full my-2 gap-1 justify-items-start justify-center">
              <div className="flex flex-row">
                <span className="self-center align-baseline text-base font-semibold uppercase text-[#DDA853]">
                  <div className="h-2.5 w-20 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
                </span>
                <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                <span className="self-center align-baseline text-xs font-medium text-black">
                  <div className="h-2.5 w-20 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
                </span>
                <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                <span className="self-center align-baseline text-xs font-medium text-black">
                  <div className="h-2.5 w-20 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-2.5 w-full bg-gray-400 dark:bg-gray-600 rounded animate-pulse"
                ></div>
              ))}
            </div>
            <div className="flex flex-row w-full my-3 gap-1 justify-items-start justify-end">
              <div className="flex flex-row">
                <div className="h-2.5 w-48 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : !isError &&
          !isFetching &&
          (!tour || Object.keys(tour || {}).length === 0) ? (
          <div className="flex w-full h-full justify-center">
            <div className="flex min-h-screen flex-col items-center justify-center gap-2">
              <p className="text-black text-2xl dark:text-gray-400">
                Data tidak tersedia
              </p>
            </div>
          </div>
        ) : isError && !isFetching ? (
          <div className="w-full h-full flex justify-center">
            <div className="flex min-h-screen flex-col items-center justify-center gap-2">
              <Refetch refetch={refetch} />
            </div>
          </div>
        ) : (
          <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
            <div className="relative flex justify-center my-4 items-start w-full h-full min-h-[300px] lg:min-h-[500px] rounded-xl overflow-hidden">
              {!tour?.latitude && !tour?.longitude && !gmapsApiKey ? (
                <p className="text-gray-500 dark:text-gray-400">
                  Map location not available
                </p>
              ) : (
                <iframe
                  src={mapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${tour?.title}`}
                  className="absolute inset-0"
                />
              )}
            </div>
          
           <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex justify-center my-4 items-start w-full  min-h-[300px]  rounded-xl overflow-hidden">
              <img
                src={tour?.thumbnail}
                alt={tour?.title}
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col w-full justify-center">
                 <div className="flex my-3 items-center">
              <h5 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white hover:text-blue-600">
                {tour.title}
              </h5>
            </div>
            <div className="flex my-3 items-center">
              <p className="my-0 text-lg font-semibold text-gray-900 dark:text-white">
                {tour.address}
              </p>
            </div>
            <div className="col-span-2 lg:col-span-1 text-start">
              {tour?.link?.gmap && (
                <div className="flex justify-start items-center gap-x-2">
                  <CiMap className="w-4 h-4 rounded-sm text-[#113F67]" />
                  <a
                    href={tour.link.gmap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md font-normal mb-0 text-gray-900 dark:text-white hover:font-bold"
                  >
                    Lokasi
                  </a>
                </div>
              )}
              {tour?.link?.website && (
                <div className="flex justify-start items-center gap-x-2">
                  <BiGlobe className="w-4 h-4 rounded-sm text-[#113F67]" />
                  <a
                    href={tour.link.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md font-normal mb-0 text-gray-900 dark:text-white hover:font-bold"
                  >
                    {tour.link.website}
                  </a>
                </div>
              )}
              {tour?.link?.email && (
                <div className="flex justify-start items-center gap-x-2">
                  <CgMail className="w-4 h-4 rounded-sm text-[#113F67]" />
                  <a
                    href={`mailto:${tour.link.email}`}
                    className="text-md font-normal mb-0 text-gray-900 dark:text-white hover:font-bold"
                  >
                    {tour.link.email}
                  </a>
                </div>
              )}
            </div>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mt-2">
              {tour.description}
            </p>
            <div className="w-full flex flex-wrap gap-2 md:gap-6 justify-center justify-items-center items-center my-4">
              {tour.link.sosmed ? (
                tour.link.sosmed.map(({ key, value }) => {
                  const Icon = sosmedIcons[key];
                  return (
                    <a
                      key={key}
                      href={`https://${value}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-items-center w-fit items-center rounded-md bg-[#113F67] p-3 hover:bg-[#F3F9FB] group focus:ring-2 focus:ring-gray-400 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 ease-in-out"
                    >
                      {Icon ? (
                        <Icon className="w-6 h-6 lg:w-4 lg:h-4 rounded-sm text-white group-hover:text-[#113F67]" />
                      ) : (
                        <span className="text-white">{key}</span>
                      )}
                    </a>
                  );
                })
              ) : (
                <></>
              )}
            </div>
                </div>
           </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TourDetail;
