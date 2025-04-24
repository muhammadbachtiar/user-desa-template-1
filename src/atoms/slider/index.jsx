import Slider from "react-slick";
import PropTypes from "prop-types";


const SliderInfografis = ({data, onClickHandler})=> {

const settings = {
    dots: false,
    infinite: data.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
};
   
   return <Slider {...settings}>
                {data.map((banner, index) => (
                    <div className="px-1 h-full" key={index} onClick={()=> {onClickHandler(index)}}>
                        <figure className="max-w-lg h-96">
                            <img className="h-full max-w-full w-full rounded-lg cursor-pointer" src={banner.link} alt="image description"></img>
                            <figcaption className="mt-2 text-sm text-center text-[#F3F9FB] dark:text-gray-400">{banner.title}</figcaption>
                        </figure>
                    </div>
                ))}
            </Slider>

}

SliderInfografis.propTypes = {
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
    onClickHandler: PropTypes.func.isRequired 
};

export default SliderInfografis;