import React, { useEffect, useState } from 'react'
import styles from '../../styles/switcher.module.css'
import { useTranslation } from "react-i18next";
const Switcher = () => {
    const { t, i18n } = useTranslation();
const [change,setChange]=useState('en')
    document.body.dir = i18n.dir();

    useEffect(()=>{
  i18n.changeLanguage(`${change}`)
    },[change])
  return (
    <div className={styles.Switcher}>
        <span onClick={()=>setChange('az')}>Az<span></span></span>
        <span onClick={()=>setChange('en')}>En<span></span></span>
        <span onClick={()=>setChange('ru')}>Ru<span></span></span>
    </div>
  )
}

export default Switcher