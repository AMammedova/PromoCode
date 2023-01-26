import React from 'react'
import {Outlet,Navigate} from "react-router-dom"
const AdminRoute = () => {
    const role = localStorage.getItem("role")

  return role==="Admin" ? <Outlet /> : <Navigate to={"/merchant"} />
}

export default AdminRoute