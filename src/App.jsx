import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import SideBar from "./components/SideBar";
import List from "./pages/Admin/List";
import Generate from "./pages/Admin/Generate";
import Merchants from "./pages/Admin/Merchants";
import Report from "./pages/Admin/Report";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";

const App = () => {
  const { t, i18n } = useTranslation();

  document.body.dir = i18n.dir();
  i18n.changeLanguage("ru");
  return (
    <div className="min-h-screen font-inter text-gray-900 font-medium flex bg-gray-50">
      <SideBar />
 
      {t("welcome")}
      <div className="px-8">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/list" element={<List />} />
          <Route path="/dashboard/generate" element={<Generate />} />
          <Route path="/dashboard/merchants" element={<Merchants />} />
          <Route path="/dashboard/report" element={<Report />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
