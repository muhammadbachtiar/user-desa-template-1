import PropTypes from "prop-types";
import { useEffect } from "react";

const ThumbnailBanner = ({ bgUrl }) => {

    const bgClass = `bg-[url(${bgUrl})]`
          
    useEffect(() => {
        const bgElement = document.getElementById("thumbnail");
        if (bgElement && bgUrl) {
            bgElement.style.backgroundImage = `url(${bgUrl})`;
        }
    }, [bgUrl]);

  return (
    <>
        <section tabIndex={1} id="thumbnail" className={`relative bg-cover bg-bottom w-full h-60  md:h-96 flex justify-center items-end ${bgClass}`}>
            <div className="hidden lg:block absolute inset-0 bg-black/30 backdrop-blur-sm rounded-s-md"></div>
            <div className="relative z-10">
                <img
                    src={`${bgUrl}`}
                    alt="thumbnail"
                    className="hidden lg:block w-full h-96 object-cover shadow-xl relative -bottom-8"
                />
            </div>
        </section>
    </>
  );
};


export default ThumbnailBanner;

ThumbnailBanner.propTypes = {
    bgUrl: PropTypes.string.isRequired
};