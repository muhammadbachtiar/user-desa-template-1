import PropTypes from "prop-types";
import { BiGlobe } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { CiMap } from "react-icons/ci";
import { Link } from "react-router-dom";
import sosmed from "../../atoms/icons/sosmed.js";

const TourCard = ({ slug, thumbnail, title, address, map, website, email, socmed }) => {


  return (
    <>
          <div className="col-span-6 w-full rounded-lg dark:bg-gray-800">                  
            <Link to={`/tour/${slug}`}>
                <h5 className="text-4xl font-bold mb-5 tracking-tighter text-gray-900 dark:text-white hover:text-blue-600">{title}</h5>
            </Link>
            <div className="flex items-center mt-2">
                <p className="my-0 text-lg font-semibold text-gray-900 dark:text-white">{address}</p>
            </div>
            <div className="col-span-2 lg:col-span-1 text-start">
                <div className="flex justify-start items-center gap-x-2">
                    <CiMap className="w-4 h-4 rounded-sm text-[#113F67]"></CiMap>
                    <a href={map} target="blank" className="text-md font-normal mb-0 text-gray-900 dark:text-white hover:font-bold ">Lokasi</a>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <BiGlobe className="w-4 h-4 rounded-sm text-[#113F67]"></BiGlobe>
                    <a href={website} target="blank" className="text-md font-normal mb-0 text-gray-900 dark:text-white">{website}</a>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <CgMail className="w-4 h-4 rounded-sm text-[#113F67]"></CgMail>
                    <a href={email} target="blank" className="text-md font-normal mb-0 text-gray-900 dark:text-white">{email}</a>
                </div>
            </div>
        </div>
        <div className="col-span-6 flex flex-col gap-y-3 justify-center items-center dark:bg-gray-800">                  
            <img
                className="h-auto w-full shadow-2xl backdrop-blur-2xl"
                src={thumbnail}
                alt="image description"
            />
            <div className="w-full flex flex-wrap gap-6 justify-center justify-items-center items-center">
                {socmed ? socmed.map(({ key, value }) => {
                    const Icon = sosmed[key]; 
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
                }) : <></>}
            </div>
        </div>
        <div className="col-span-6 w-full px-14 flex justify-center items-center dark:bg-gray-800">                  
            <hr className="col-span-6 w-full h-px bg-gray-700 border-0 rounded-sm my-3 dark:bg-gray-700"/>
        </div>
    </>
  );
};


export default TourCard;

TourCard.propTypes = {
    slug: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    socmed: PropTypes.array
};