import Lightbox from "react-spring-lightbox";
import { FaX } from "react-icons/fa6";
import PropTypes from "prop-types";

const LightboxImage = ({ data = [], isOpen, setIsOpen, currentIndex }) => {

    const transformedInfografisData = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        src: item.link,
      }))
    : [];

  return (
    <>
         <Lightbox
            isOpen={isOpen}
            images={transformedInfografisData}
            currentIndex={currentIndex}
            renderHeader={() => (
                <div className="flex w-full bg-black bg-opacity-35 justify-end px-3 py-1 items-center">
                    <button 
                    className="bg-transparent text-white text-md p-3 rounded-md transition duration-200 ease-in-out 
                                hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" 
                    onClick={() => { setIsOpen(false); }}
                    >
                        <FaX />
                    </button>

                </div>
            )}
            renderFooter={() => (
                <div className="flex w-full text-white bg-black bg-opacity-35 justify-center px-3 py-1 items-center">
                    <h1 className="text-base p-3 font-normal leading-none tracking-tight md:text-lg lg:text-xl dark:text-white">{transformedInfografisData[currentIndex]?.title || "Title Not Available"}</h1>
                </div>
            )}
            className="bg-black bg-opacity-65 text-white z-50"
        />
    </>
  );
};


export default LightboxImage;

LightboxImage.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            user_id: PropTypes.number,
            slug: PropTypes.string,
            published_at: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string
        })
    ).isRequired, 
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    currentIndex: PropTypes.number
};