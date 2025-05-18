import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnautorizedLayout from "../layout/unauthorizedLayout";
import useSetting from "../hooks/settings/useSettings";
import { generateRoutes } from "../services/utils/generateRoutes";

const Routers = () => {
  const { data: menu } = useSetting('menu', {});
 
  return (
    <Router>
      <Routes>
          <Route path="/" element={<UnautorizedLayout />} />
          <Route path="/article" element={<UnautorizedLayout />} />
          <Route path="/article/:slug" element={<UnautorizedLayout />} />
          <Route path="/tour" element={<UnautorizedLayout />} />
          <Route path="/tour/:slug" element={<UnautorizedLayout />} />
          <Route path="/search/:search" element={<UnautorizedLayout />} />
          {generateRoutes(menu?.value || [])}
          <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default Routers;
