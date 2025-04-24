import Slider from "react-slick";
import PropTypes from "prop-types";
import useFetchArticlebySlug from "../../hooks/useFetchArticlebySlug";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import ArticleCard from "../ArticleCard";

const SliderCard = ({data  = [{src:"", alt:""}], isIncludeModal = false})=> {
const [openModal, setOpenModal] = useState(false);
const [slug, setSlug] = useState('');
useFetchArticlebySlug(slug);

const modalData = useSelector((state) => state.data.detailArticle);

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
    
const settings = {
    dots: true,
    infinite: data.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: dots => (
        <div
          style={{
            position: 'unset',
            padding: "0 10px"
          }}
        >
          <ul style={{ margin: "0px" }}> {dots} </ul>
        </div>
      ),
};

SamplePrevArrow.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object, 
    onClick: PropTypes.func 
};

SampleNextArrow.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object, 
    onClick: PropTypes.func 
};
  
return (
        <>
          <Slider {...settings}>
            {data.map((card) => 
              <div tabIndex={1} key={card.slug} onClick={() => {setOpenModal(true); setSlug(card.slug);}}>
                  <ArticleCard thumbnail={card.thumbnail} title={card.title} description={card.description} category={card.category.name} published_at={card.published_at} /> 
              </div>    
            )}
          </Slider>
          {
            isIncludeModal && ( 
              <Modal show={openModal} size={"7xl"} onClose={() => {setOpenModal(false);}}>
                <ModalHeader>{ modalData[slug] && modalData[slug].title ? modalData[slug].title :   <Skeleton baseColor="#595E6B" width={200}  height={10}/> }</ModalHeader>
                <ModalBody>
                    <div className="px-3 group hover:scale-100 focus:scale-100 transition duration-300 ease-in-out">
                        <div className="relative overflow-hidden rounded-sm w-full h-48 md:h-96 group">
                            <img 
                                className="w-full h-full object-cover transform group-hover:scale-110 group-focus:scale-110 transition duration-300 ease-in-out" 
                                src={modalData[slug] && modalData[slug].thumbnail  ? modalData[slug].thumbnail :   <Skeleton baseColor="#595E6B" height={300}/>} 
                                alt="" 
                            />
                        </div>
                        <div className="p-1">
                            <div className='flex flex-row w-full my-2 gap-1 justify-items-start justify-between'>
                                <div className="flex flex-row">
                                  <span className="self-center align-baseline text-base font-semibold uppercase text-[#DDA853]">{modalData[slug] && modalData[slug].category ? modalData[slug].category.name : <Skeleton baseColor="#595E6B" width={100} height={10}/>}</span>
                                  <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                                  <span className="self-center align-baseline text-xs font-medium text-black">{modalData[slug] && modalData[slug].user ? modalData[slug].user.name : <Skeleton baseColor="#595E6B" width={100} height={10}/>}</span>
                                  <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                                  <span className="self-center align-baseline text-xs font-medium text-black">{modalData[slug] && modalData[slug].published_at ? modalData[slug].published_at : <Skeleton baseColor="#595E6B" width={100} height={10}/>}</span>
                                </div>
                                <div className="flex flex-row">
                                  {modalData[slug] && modalData[slug].views ? <p className="text-gray-500 dark:text-gray-400">Dilihat <strong className="font-semibold text-gray-900 dark:text-white">{modalData[slug].views}</strong> kali</p> : <Skeleton baseColor="#595E6B" width={100} height={10}/>}
                                </div>
                            </div>
                            <h5 className="my-2 leading-5 text-lg font-bold tracking-tight text-gray-900  dark:text-white">{modalData[slug] && modalData[slug].title ? modalData[slug].title :   <Skeleton baseColor="#595E6B" height={10}/>}</h5>
                            {modalData[slug] && modalData[slug].content ? (
                                <div dangerouslySetInnerHTML={{ __html: modalData[slug].content }} />
                              ) : (
                                <Skeleton baseColor="#595E6B" height={10} />
                              )}
                        </div>
                    </div>
                </ModalBody>
              </Modal>
            )
          }
        </>
      )
}

SliderCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            thumbnail: PropTypes.string,
            category_id: PropTypes.number,
            published_at: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string
        })
    ).isRequired, 
    isIncludeModal: PropTypes.bool
};

export default SliderCard;