import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useSetting from "../../hooks/settings/useSettings";
import Refetch from "../refetch";

const Logo = ({textColor="text-[#F3F9FB]", hoverBgColor="bg-[#226597]"}) => {

  const { data: logo, isLoading, isError, isFetching, refetch } = useSetting(`logo-${import.meta.env.VITE_VILLAGE_ID}`, {});

  return (
    <>
        {isLoading ? (
                <div className="w-32 h-10 bg-gray-300 rounded animate-pulse"></div>
            ) : isError && !isFetching  ? (
                <div className="flex flex-col items-center justify-center gap-2">
                    <Refetch refetch={refetch}/>
                </div>
            ) : (
                 <Link to={"/"} className={`flex items-center px-2 py-1 space-x-3 rtl:space-x-reverse rounded-md hover:${hoverBgColor} hover:scale-105 transition transform duration-300 ease-in-out`}>
                    <img src={logo?.value?.imageUrl ?? '/unavailablei-image.png'} className="h-10" alt="App Logo"></img>
                    <div className='flex flex-col gap-2'>
                        <span className={`self-start align-baseline text-xl leading-3 tracking-tighter font-semibold uppercase ${textColor}`}>{logo?.value?.regionEntity ?? '[Judul logo belum diatur]'} </span>
                        <span className={`self-start align-baseline text-xs leading-3 font-normal italic ${textColor}`}>{(logo?.value?.regionDescription) ??  "[Sub judul logo belum diatur]"} </span>
                    </div>
                </Link>
            )
        }
    </>
  );
};

Logo.propTypes = {
    textColor: PropTypes.string,
    hoverBgColor: PropTypes.string
};

export default Logo;