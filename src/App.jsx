import React from "react";
import { Route, Routes } from "react-router-dom";
import { redirect } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import List from "./pages/Admin/List";
import Generate from "./pages/Admin/Generate";
import Merchants from "./pages/Admin/Merchants";
import Report from "./pages/Admin/Report";
import MerchantReport from "./pages/Merchant/MerchantReport";
import MerchantDashboard from "./pages/Merchant/MerchantDashboard";
import MerchantSearch from "./pages/Merchant/MerchantSearch";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import MerchantRoute from "./components/MerchantRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page404 from "./components/Page404";

const App = () => {
  return (
    <div className="flex min-h-screen font-medium text-gray-900 font-inter bg-gray-50">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoute />}>
            <Route
              path="/dashboard"
              element={
                <Layout variant={1} title="Dashboard">
                  <Dashboard />
                </Layout>
              }
              exact
            />
            <Route
              path="/dashboard/list"
              element={
                <Layout variant={1} title="List">
                  <List />
                </Layout>
              }
              exact
            />
            <Route
              path="/dashboard/generate"
              element={
                <Layout variant={1} title="Generate">
                  <Generate />
                </Layout>
              }
              exact
            />
            <Route
              path="/dashboard/merchants"
              element={
                <Layout variant={1} title="Merchants">
                  <Merchants />
                </Layout>
              }
              exact
            />
            <Route
              path="/dashboard/report"
              element={
                <Layout variant={1} title="Report">
                  <Report />
                </Layout>
              }
              exact
            />
          </Route>
          <Route element={<MerchantRoute />}>
            <Route
              path="/merchant"
              element={
                <Layout variant={2} title="Dashboard">
                  <MerchantDashboard />
                </Layout>
              }
              exact
            />
            <Route
              path="/merchant/report"
              element={
                <Layout variant={2} title="Report">
                  <MerchantReport />
                </Layout>
              }
              exact
            />
            <Route
              path="/merchant/search"
              element={
                <Layout variant={2} title="Search">
                  <MerchantSearch />
                </Layout>
              }
              exact
            />
          </Route>
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;
