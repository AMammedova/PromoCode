import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";

const Layout = ({ children, title }) => {
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="flex-1 px-8">
        <Header title={title} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
