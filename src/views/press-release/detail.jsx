import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiCalendar } from "react-icons/bi";
import usePressReleaseDetail from "../../hooks/contens/press-release/useDetail";
import useFeatureFlags from "../../hooks/settings/useFeatureFlags";
import { cleanContent } from "../../services/utils/cleanContent";
import DownloadButton from "../../services/utils/DownloadButton";
import AsideContent from "../../components/app-layout/asideContent";
import RichTextContent from "../../atoms/RichTextContent";
import ThumbnailBanner from "../../atoms/ThumbnailBanner";
import LightboxImage from "../../atoms/Lightbox";
import Refetch from "../../atoms/refetch";

const PressReleaseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { pressRelease: isPressReleaseEnabled, isLoading: isFeaturesLoading } = useFeatureFlags();
  const {
    data: pressRelease,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = usePressReleaseDetail({ with: "category,attachments,user" }, slug, true, {});

  useEffect(() => {
    if (!isFeaturesLoading && !isPressReleaseEnabled) {
      navigate("/", { replace: true });
    }
  }, [isFeaturesLoading, isPressReleaseEnabled, navigate]);

  if (isFeaturesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#113F67]"></div>
      </div>
    );
  }

  if (!isPressReleaseEnabled) return null;

  // Extract image URLs for slider and download
  const getContentImages = () => {
    if (!pressRelease) return [];
    const images = [];

    if (pressRelease.thumbnail) {
      images.push({ title: "Thumbnail", link: pressRelease.thumbnail });
    }

    const imgTagMatches =
      pressRelease.content?.match(/<img[^>]+src="([^">]+)"/gi) || [];
    imgTagMatches.forEach((imgTag, index) => {
      const srcMatch = imgTag.match(/src="([^">]+)"/i);
      if (srcMatch && srcMatch[1]) {
        images.push({
          title: `Image ${index + 1} from content`,
          link: srcMatch[1],
        });
      }
    });

    pressRelease.attachments?.forEach((attachment, index) => {
      images.push({
        title: attachment?.original_name || `Attachment ${index + 1}`,
        link: attachment.url,
      });
    });

    return images;
  };

  const contentImageUrl = getContentImages();
  const paragraphs = pressRelease ? cleanContent(pressRelease.content || "") : [];

  return (
    <>
      <div className="min-h-screen w-full">
        <AsideContent>
          {isLoading ||
          (!pressRelease || Object.keys(pressRelease || {}).length === 0) &&
            isFetching ? (
            <div className="pt-12 px-4 md:px-32 w-full min-h-screen bg-[#F3F9FB]">
              <div className="h-72 w-full bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
              <h5 className="my-2 text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                <div className="h-2.5 w-full bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
              </h5>
              <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700" />
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
            </div>
          ) : !isError &&
            !isFetching &&
            (!pressRelease ||
              Object.keys(pressRelease || {}).length === 0) ? (
            <div className="flex w-full h-full justify-center">
              <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                <p className="text-black text-2xl dark:text-gray-400">
                  Siaran pers tidak tersedia
                </p>
                <Link
                  to="/press-release"
                  className="mt-4 px-6 py-2.5 bg-[#113F67] text-white rounded-lg hover:bg-[#0d2f4f] transition-colors text-sm font-medium"
                >
                  Kembali ke Siaran Pers
                </Link>
              </div>
            </div>
          ) : isError && !isFetching ? (
            <div className="w-full h-full flex justify-center">
              <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                <Refetch refetch={refetch} />
              </div>
            </div>
          ) : (
            <>
              <ThumbnailBanner bgUrl={pressRelease.thumbnail || "/unavailable-image.png"} />
              <div className="pt-12 min-h-screen">
                {/* Category */}
                <span className="self-start text-xs sm:text-sm font-semibold text-[#DDA853] uppercase tracking-wider">
                  {pressRelease.category?.name ?? "Siaran Pers"}
                </span>

                {/* Title */}
                <h5 className="my-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-start font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                  {pressRelease.title}
                </h5>

                <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700" />

                {/* Meta info */}
                <div className="flex flex-row w-full my-2 gap-1 justify-items-start justify-center">
                  <div className="flex flex-row items-center">
                    <span className="self-center align-baseline text-base font-semibold uppercase text-[#DDA853]">
                      {pressRelease.category?.name ?? "Siaran Pers"}
                    </span>
                    <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                    <span className="self-center align-baseline text-xs font-medium text-black">
                      {pressRelease.user?.name ?? ""}
                    </span>
                    <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                    <div className="flex items-center gap-1">
                      <BiCalendar className="h-3.5 w-3.5 text-gray-500" />
                      <span className="self-center align-baseline text-xs font-medium text-black">
                        {moment(pressRelease.published_at ?? "")
                          .locale("id")
                          .format("dddd, D MMMM YYYY")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <RichTextContent content={pressRelease.content || ""} />

                {/* Image Slider */}
                {contentImageUrl.length > 0 && (
                  <ImageSlider images={contentImageUrl} />
                )}

                {/* Footer info */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="space-y-1 text-gray-600 text-xs sm:text-sm">
                    <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                      Dinas Kominfo SP Pemkab Muara Enim
                    </p>
                    <p>
                      Website:{" "}
                      <a
                        href="https://muaraenimkab.go.id/press-release"
                        className="text-[#113F67] hover:underline"
                      >
                        muaraenimkab.go.id/press-release
                      </a>
                    </p>
                    <p>Facebook: Pemkab Muara Enim</p>
                    <p>
                      Instagram:{" "}
                      <a
                        href="https://instagram.com/pemkab_muaraenim"
                        className="text-[#113F67] hover:underline"
                      >
                        @pemkab_muaraenim
                      </a>
                    </p>
                  </div>
                </div>

                {/* Author & Views */}
                <div className="flex flex-row w-full my-3 px-8 gap-1 justify-items-start justify-end">
                  <div className="flex flex-row">
                    <p className="text-gray-500 dark:text-gray-400">
                      <strong className="font-semibold text-gray-900 dark:text-white">
                        {pressRelease.user?.name}
                      </strong>
                    </p>
                  </div>
                </div>

                {/* Download */}
                <DownloadButton
                  article={pressRelease}
                  paragraphs={paragraphs}
                  contentImageUrl={contentImageUrl}
                />
              </div>
            </>
          )}
        </AsideContent>
      </div>
    </>
  );
};

/** Image Slider with Lightbox for press release photos */
function ImageSlider({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: images.length >= 3 ? 3 : images.length,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: images.length >= 3 ? 3 : images.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: images.length >= 2 ? 2 : 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div style={{ position: "unset", padding: "10px 0 0" }}>
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="mt-6 mb-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        Galeri Foto
      </h3>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="px-1.5">
            <div
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => {
                setCurrentIndex(index);
                setIsOpen(true);
              }}
            >
              <img
                src={img.link}
                alt={img.title}
                className="w-full h-40 sm:h-48 md:h-52 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
              <p className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-xs text-white bg-black/50 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.title}
              </p>
            </div>
          </div>
        ))}
      </Slider>
      <LightboxImage
        data={images}
        isOpen={isOpen}
        currentIndex={currentIndex}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default PressReleaseDetail;
