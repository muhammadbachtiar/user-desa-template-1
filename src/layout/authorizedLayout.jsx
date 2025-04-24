import { useLocation } from 'react-router-dom';
import AppMenu from '../components/headerApp';
import Dashboard from '../views/dashboard';
import Payment from '../views/payment';

const AuthorizedLayout = () => {

  const { pathname } = useLocation();
  let contentComponent;

  switch (true) {
    case pathname ===  "/dashboard":
      contentComponent = <Dashboard />;
      break
    case pathname.includes("/transaction/"):     
    contentComponent = <Payment />;
  };
  
  return (
    <div className="min-h-screen bg-primary flex flex-col items-start w-full">
        <AppMenu />
        <div className="flex w-full border-gray-200 justify-between items-center mx-auto max-w-screen-xl p-4">
          {contentComponent}
        </div>
    </div>
  );
};

export default AuthorizedLayout;