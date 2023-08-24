import React from "react"
import { Routes, Route } from "react-router-dom"
import UpdateProfile from "../Pages/UpdateProfile.page"


const notCompliteRoutes = (
    <Routes>
        <Route path="/" element={<UpdateProfile />} exact />
        <Route path="*" element={<UpdateProfile />} exact  />
    </Routes>
)

export default notCompliteRoutes
