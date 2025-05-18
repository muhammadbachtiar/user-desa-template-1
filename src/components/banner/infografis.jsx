import SliderInfografis from "../../atoms/slider";

const InfografisBanner = () => {
  
  return (
       <>
            <div className="col-span-4 min-h-[24rem] bg-[#226597] bg-opacity-90 lg:rounded-e-md py-3 lg:col-span-1 flex justify-center items-center">
                <div className="max-w-sm w-4/5 rounded-lg dark:bg-gray-800">
                    <SliderInfografis useButton={true} useDots={false} />
                </div>
            </div>
       </>
  );
};


export default InfografisBanner;