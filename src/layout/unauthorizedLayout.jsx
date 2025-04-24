import { useLocation } from 'react-router-dom';
import AppMenu from '../components/headerApp';
import FooterApp from '../components/footerApp';
import MainPage from '../views/mainPage';
import Login from '../views/login';
import ArticleList from '../views/article/list';
import ArticleDetail from '../views/article/detail';
import TourList from '../views/tour/list';
import TourDetail from '../views/tour/detail';
import Container from '../views/container';
import SearchPage from '../views/search';

const UnautorizedLayout = () => {

  const { pathname } = useLocation();
  let contentComponent;

  switch (true) {
    case pathname ===  "/":
      contentComponent = <MainPage />;
      break;
    case pathname.includes("/article/"):     
      contentComponent = <ArticleDetail />;
      break;
    case pathname ===  "/article":
      contentComponent = <ArticleList />;
      break;
      case pathname.includes("/search/"):     
      contentComponent = <SearchPage />;
      break;
    case pathname.includes("/tour/"):     
      contentComponent = <TourDetail />;
      break;
    case pathname.includes("/profile/"):     
      contentComponent = <Container />;
      break;
    case pathname ===  "/tour":
      contentComponent = <TourList />;
      break;
    case pathname ===  "/login":
        contentComponent = <Login />;
        break;
  };
  
  return (
        <div className="min-h-screen bg-white  justify-center pb-16 md:pb-0">
            <AppMenu />
            <div className="w-full h-full overflow-hidden bg-slate-100 flex flex-col items-center content-center gap-6">
                {contentComponent}
            </div>
            <FooterApp/>
        </div>
  );
};

export default UnautorizedLayout;