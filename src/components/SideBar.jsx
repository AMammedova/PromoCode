import React, { useState } from "react";
import dashboarIcon from "../assets/icons/dashboard.svg";
import generateIcon from "../assets/icons/generate.svg";
import merchantsIcon from "../assets/icons/merchants.svg";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const SideBar = () => {
  const [activeId, setActiveId] = useState(1);
  const links = [
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
  return (
    <div className="text-gray-600/90 min-h-screen shadow-sm pl-4 relative bg-white w-72">
      <div className="flex gap-3 py-7">
        <div className="flex justify-center items-center">
          <img className="w-12" src={logo} alt="" />
        </div>
        <h1 className="text-lg w-12">MasterCard Dashboard</h1>
      </div>
      <div className="h-[1px] absolute left-0 w-full bg-gray-100"></div>
      <div className="font-montserrat py-4">
        {links.map(({ id, name, icon, link }) => (
          <Link
            key={id}
            className="outline-none"
            to={`/dashboard${link}`}
            onClick={() => setActiveId(id)}
          >
            <div
              className={`px-10 py-7 relative rounded-l-3xl ${
                id === activeId
                  ? "bg-gray-200 before:h-full before:rounded-l-full before:w-4 pl-10 before:top-0 before:left-0 before:absolute before:bg-amber-400"
                  : ""
              }`}
            >
              <div className="flex gap-5 text-xl items-center">
                <span className="flex justify-center">
                  <img src={icon} alt={name} />
                </span>
                <p>{name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
