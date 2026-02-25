import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnautorizedLayout from "../layout/unauthorizedLayout";
import useSetting from "../hooks/settings/useSettings";
import { generateRoutes } from "../services/utils/generateRoutes";
import NotFound from "../views/notfound";
import { validateAndRedirect } from "./utils/shouldRedirect";
import GoogleAnalytics from "../components/shared/GoogleAnalytics";

const Routers = () => {
  
  const { data: menu } = useSetting(`menu-${import.meta.env.VITE_VILLAGE_ID}`, {});
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  const path = pathSegments || [];
  
  if (validateAndRedirect(path)) {
    const redirects = {
      tour: '/tour',
      article: '/article',
      'press-release': '/press-release',
    };
    window.location.replace(redirects[path[0]] || '/');
    return null;
  }

  return (
    <Router>
      <GoogleAnalytics />
      <Routes>
          <Route path="/" element={<UnautorizedLayout />} />
          <Route path="/article" element={<UnautorizedLayout />} />
          <Route path="/article/:slug" element={<UnautorizedLayout />} />
          <Route path="/tour" element={<UnautorizedLayout />} />
          <Route path="/tour/:slug" element={<UnautorizedLayout />} />
          <Route path="/press-release" element={<UnautorizedLayout />} />
          <Route path="/press-release/:slug" element={<UnautorizedLayout />} />
          <Route path="/search/:search" element={<UnautorizedLayout />} />
          {generateRoutes(Array.isArray(menu?.value) ? menu.value : [])}
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routers;
