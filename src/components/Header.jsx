import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/header.module.css";
import { MdOutlineLogout } from "react-icons/md";
import Switcher from "./Switcher";
import { useTranslation } from "react-i18next";
const Header = ({ title }) => {
  const { t, i18n } = useTranslation();

  const nav = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    nav("/");
    location.reload();
  };
  const logName = localStorage.getItem("role");

  return (
    <div>
      <div
        className={`${styles.Navbar} fixed z-20 xl:w-9/12 w-7/12 lg:w-8/12 2xl:w-10/12  bg-gray-100 px-2 `}
      >
        <div className={styles.NavbarTitle}>
          <h3>{title}</h3>
        </div>
        <div className={styles.NavbarSwitcher}>
          <Switcher />
        </div>
        <div className={styles.NavbarAdminLogo}>
          <span>{logName}</span>
          <span className={styles.LogoAdmin}></span>
          <span>
            <MdOutlineLogout
              style={{ fontSize: "34px", cursor: "pointer" }}
              color="#4b5563e6"
              onClick={handleLogOut}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
