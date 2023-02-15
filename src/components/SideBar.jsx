import React, { useEffect, useMemo, useState } from "react";
import dashboarIcon from "../assets/icons/dashboard.svg";
import generateIcon from "../assets/icons/generate.svg";
import merchantsIcon from "../assets/icons/merchants.svg";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
const SideBar = ({ variant }) => {
  const [activeId, setActiveId] = useState(1);
  const { pathname } = useLocation();

  const linksDashboard = [
    {
      id: 1,
      name: "Dashboard",
      icon: dashboarIcon,
      link: "/",
    },
    {
      id: 2,
      name: "List",
      icon: dashboarIcon,
      link: "/list",
    },
    {
      id: 3,
      name: "Generate",
      icon: generateIcon,
      link: "/generate",
    },
    {
      id: 4,
      name: "Merchants",
      icon: merchantsIcon,
      link: "/merchants",
    },
    {
      id: 5,
      name: "Report",
      icon: merchantsIcon,
      link: "/report",
    },
  ];

  const linkMerchants = [
    // {
    //   id: 1,
    //   name: "Dashboard",
    //   icon: dashboarIcon,
    //   link: "/",
    // },
    {
      id: 2,
      name: "Search",
      icon: generateIcon,
      link: "/search",
    },
    {
      id: 3,
      name: "Report",
      icon: merchantsIcon,
      link: "/report",
    },
  ];

  useEffect(() => {
    variant === 1 &&
      setActiveId(
        linksDashboard.find(({ link, id }) => {
          return link === `/${pathname.split("/")[2]}`;
        })?.id || 1
      );
    variant === 2 &&
      setActiveId(
        linkMerchants.find(({ link, id }) => {
          return link === `/${pathname.split("/")[2]}`;
        })?.id || 1
      );
  }, []);

  return (
    <div className="relative min-h-screen pl-4 bg-white shadow-sm text-gray-600/90 w-72">
   <div className="fixed">
   <div className="flex gap-3 py-7">
        <div className="flex items-center justify-center">
          <img className="w-12" src={logo} alt="" />
        </div>
        <h1 className="w-12 text-lg">MasterCard Dashboard</h1>
      </div>
      <div className="h-[1px] absolute left-0 w-full bg-gray-100"></div>
      <div className="py-4 font-montserrat">
        {variant === 1
          ? linksDashboard.map(({ id, name, icon, link }) => (
              <Link
                key={id}
                className="outline-none"
                to={`/dashboard${link}`}
                state={activeId}
                onClick={() => setActiveId(id)}
              >
                <div
                  className={`px-10 py-7 relative rounded-l-3xl  ${
                    id === activeId
                      ? "bg-gray-200 before:h-full before:rounded-l-full before:w-4 pl-10 before:top-0 before:left-0 before:absolute before:bg-amber-400"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-5 text-xl">
                    <span className="flex justify-center">
                      <img src={icon} alt={name} />
                    </span>
                    <p>{name}</p>
                  </div>
                </div>
              </Link>
            ))
          : variant === 2
          ? linkMerchants.map(({ id, name, icon, link }) => (
              <Link
                key={id}
                className="outline-none"
                to={`/merchant${link}`}
                state={activeId}
                onClick={() => setActiveId(id)}
              >
                <div
                  className={`px-10 py-7 relative rounded-l-3xl  ${
                    id === activeId
                      ? "bg-gray-200 before:h-full before:rounded-l-full before:w-4 pl-10 before:top-0 before:left-0 before:absolute before:bg-amber-400"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-5 text-xl">
                    <span className="flex justify-center">
                      <img src={icon} alt={name} />
                    </span>
                    <p>{name}</p>
                  </div>
                </div>
              </Link>
            ))
          : ""}
      </div>
   </div>
    </div>
  );
};

export default SideBar;
