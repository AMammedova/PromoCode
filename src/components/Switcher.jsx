import React, { useEffect, useState } from "react";
import styles from "../../styles/switcher.module.css";
import { useTranslation } from "react-i18next";
const Switcher = () => {
  const { t, i18n } = useTranslation();
  const [change, setChange] = useState("en");
  document.body.dir = i18n.dir();

  useEffect(() => {
    i18n.changeLanguage(`${change}`);
  }, [change]);

  return (
    <div className={styles.Switcher}>
      <p onClick={() => setChange("az")}>Az</p>
      <span>|</span>
      <p onClick={() => setChange("en")}>En</p>
      <span>|</span>
      <p onClick={() => setChange("ru")}>Ru</p>
    </div>
  );
};

export default Switcher;
