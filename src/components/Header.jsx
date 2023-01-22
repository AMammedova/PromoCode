import React from "react";
import styles from '../../styles/header.module.css'
import {AiOutlineDown} from 'react-icons/ai'
import Switcher from "./Switcher";
import { useTranslation } from "react-i18next";
const Header = ({ title }) => {
  const { t, i18n } = useTranslation();
  return <div>
    <div className={styles.Navbar}>
      <div className={styles.NavbarTitle}>
        <h3>{title}</h3>
      </div>
      <div className={styles.NavbarSwitcher}><Switcher/></div>
      <div className={styles.NavbarAdminLogo}>
      <span>Admin</span>
        <span className={styles.LogoAdmin}></span>
        <span><AiOutlineDown/></span>
      </div>
    </div>
  </div>;
};

export default Header;
