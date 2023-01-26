import React from "react";
import { useNavigate,redirect } from "react-router-dom";
import styles from "../../styles/header.module.css";
import { MdOutlineLogout } from "react-icons/md";
import Switcher from "./Switcher";
import { useTranslation } from "react-i18next";
const Header = ({ title }) => {
  const { t, i18n } = useTranslation();

  const nav = useNavigate();

  const handleLogOut=()=>{
    localStorage.clear();
    nav("/login");
  }

  return (
    <div>
      <div className={styles.Navbar}>
        <div className={styles.NavbarTitle}>
          <h3>{title}</h3>
        </div>
        <div className={styles.NavbarSwitcher}>
          <Switcher />
        </div>
        <div className={styles.NavbarAdminLogo}>
          <span>Admin</span>
          <span className={styles.LogoAdmin}></span>
          <span>
            <MdOutlineLogout style={{fontSize:"34px",cursor:"pointer"}}  color="#4b5563e6" onClick={handleLogOut} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
