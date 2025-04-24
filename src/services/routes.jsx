import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnautorizedLayout from "../layout/unauthorizedLayout";
const Routers = () => {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<UnautorizedLayout />} />
            <Route path="/article" element={<UnautorizedLayout />} />
            <Route path="/article/:slug" element={<UnautorizedLayout />} />
            <Route path="/tour" element={<UnautorizedLayout />} />
            <Route path="/tour/:slug" element={<UnautorizedLayout />} />
            <Route path="/profile/:slug" element={<UnautorizedLayout />} />
            <Route path="/search/:search" element={<UnautorizedLayout />} />
      </Routes>
    </Router>
  );
};

export default Routers;
