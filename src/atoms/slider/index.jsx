import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { useState } from "react";
import useInfografis from "../../hooks/contens/infografis/useInfografis";
import LightboxImage from "../Lightbox";
import Refetch from "../refetch";


const SliderInfografis = ({useButton = false, useDots= false})=> {
const { data: infografies, isLoading, isFetching, refetch, isError } = useInfografis();
const [isOpen, setIsOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    
    return (
        <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
        />
    );
}

SampleNextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
};
      
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
        />
      );
}

SamplePrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
};

const settings = {
    dots: useDots,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: !useButton ? <SampleNextArrow /> : undefined,
    prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
    ...(useDots && {
        appendDots: (dots) => (
          <div
            style={{
              position: 'unset',
              padding: "0 10px"
            }}
          >
            <ul style={{ margin: "0px" }}>{dots}</ul>
          </div>
        )
      }
    )
};
   
   return <>
        {
            isLoading || (!infografies || infografies.length === 0) && isFetching ? (
                <div className="h-96 w-full rounded-lg bg-gray-300 animate-pulse"></div>
            ) : !isError && !isFetching && (!infografies || infografies.length === 0) ? (
                <div className="flex col-span-6 w-full h-full justify-center">
                    <div className="flex flex-col items-center justify-top gap-2">
                        <p className="text-black text-2xl text-center dark:text-gray-400">Infografis tidak tersedia</p>
                    </div>
                </div>
            ) : isError && !isFetching  ? (
                <div className="flex flex-col items-center justify-center gap-2">   
                    <Refetch refetch={refetch}/>
                </div>
            ) : (
                <>
                     <Slider {...settings}>
                        {infografies.map((infografis, index) => (
                            <div className="px-1 h-full" key={index} onClick={()=> {setIsOpen(true); setCurrentIndex(index)}}>
                                <figure className="max-w-lg h-96">
                                    <img className="h-full max-w-full w-full rounded-lg cursor-pointer" src={infografis.link} alt="image description"></img>
                                    <figcaption className="mt-2 text-sm text-center text-[#F3F9FB] dark:text-gray-400">{infografis.title}</figcaption>
                                </figure>
                            </div>
                        ))}
                    </Slider>
                    <LightboxImage data={infografies} isOpen={isOpen} currentIndex={currentIndex} setIsOpen={setIsOpen} />
                </>
            )
        }   
    </>
}

SliderInfografis.propTypes = {
    useDots: PropTypes.bool,
    useButton: PropTypes.bool,
};

export default SliderInfografis;