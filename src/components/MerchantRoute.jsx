import React from 'react'
import {Outlet,Navigate} from "react-router-dom"
const MerchantRoute = () => {
    const role = localStorage.getItem("role")
  return role==="Merchant" ? <Outlet /> : <Navigate to={"/dashboard"} />
}

export default MerchantRoute