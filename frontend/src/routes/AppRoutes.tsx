import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AquariumListPage from "../pages/AquariumListPage";
import ControlPage from "../pages/ControlPage/ControlPage";
import AquariumSettingsPage from "../pages/AquariumSettingsPage";
import NotificationsPage from "../pages/NotificationsPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/aquariums" element={<AquariumListPage />} />
        <Route path="/control/:id" element={<ControlPage />} />
        <Route path="/settings/:id" element={<AquariumSettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
