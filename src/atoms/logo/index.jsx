import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import SettingsService from "../../services/controllers/setting/setting.service";
import Skeleton from "react-loading-skeleton";
import { Button } from "flowbite-react";
import { LuRefreshCcw } from "react-icons/lu";
import { GrDocumentMissing } from "react-icons/gr";

const Logo = ({textColor="text-[#F3F9FB]", hoverBgColor="bg-[#226597]"}) => {

    const {
            data: logo,
            isLoading,
            isError,
            isFetching,
            refetch,
          } = useQuery({
            queryKey: ["logoSetting"],
            queryFn: async () => {
             
              return await SettingsService.getOneSetting('logo');
            }
          });

  return (
    <>
    {isLoading ? (
                  <Skeleton width={120} height={40} />
                ) : isError && !isFetching && !logo  || Object.keys(logo.data || {}).length === 0 ? (
                    <div className="flex col-span-6 w-full h-full justify-center">
                        <div className="flex bg-white p-3 rounded-sm flex-col items-center justify-top gap-2">
                            <GrDocumentMissing size={20}/>
                        </div>
                    </div>
                ) : isError && !isFetching  ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Button
                            size="sm"
                            onClick={() => {
                                refetch();
                            }}
                        >
                            <LuRefreshCcw size={20} />
                        </Button>
                    </div>
                ) : (
                    <>
                        <Link to={"/"} className={`flex items-center px-2 py-1 space-x-3 rtl:space-x-reverse rounded-md hover:${hoverBgColor} hover:scale-105 transition transform duration-300 ease-in-out`}>
                            <img src={logo.data.value.imageUrl} className="h-10" alt="App Logo"></img>
                            <div className='flex flex-col gap-2'>
                                <span className={`self-start align-baseline text-xl leading-3 tracking-tighter font-semibold uppercase ${textColor}`}>{logo.data.value.regionEntity} </span>
                                <span className={`self-start align-baseline text-xs leading-3 font-normal italic ${textColor}`}>{logo.data.value.regionDescription} </span>
                            </div>
                        </Link>
                    </>
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