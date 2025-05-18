import ArticleBanner from "../../components/banner/article";
import InfografisBanner from "../../components/banner/infografis";
import TourBanner from "../../components/banner/tour";
import Hero from "../../components/banner/hero";
import App from "../../components/banner/app";
import Profile from "../../components/banner/profile";

const MainPage = () => {
 
  return (
    <>  
        <Hero/>
        <App/>
        <Profile/>
        <div tabIndex={1} className="grid w-full grid-cols-3 lg:grid-cols-4 gap-y-6 py-6 bg-gradient-to-b from-slate-100 via-blue-[#F3F9FB] to-blue-[#F3F9FB]">
            <ArticleBanner/>
            <InfografisBanner/>
            <TourBanner/>
        </div>
    </>
  );
};

export default MainPage;
