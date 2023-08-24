import React from "react"
import { Routes, Route } from "react-router-dom"
import Arcles from '../Pages/Arcles.page'
import Author from '../Pages/Author.page'
import Arcle from '../Pages/Arcle.page'
import UpdateProfile from "../Pages/UpdateProfile.page"
import Profile from "../Pages/Profile.page"
import Create from "../Pages/Create.page"
import Edit from "../Pages/Edit.page"


const authRoutes = (
    <Routes>
        <Route path="/" element={<Arcles />} exact />
        <Route path="/author/:id" element={<Author />} exact />
        <Route path="/arcle/:id" element={<Arcle />} exact />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/update" element={<UpdateProfile />} exact />
        <Route path="/create" element={<Create />} exact />
        <Route path="/edit/:id" element={<Edit />} exact />
        <Route path="*" element={<Arcles />} exact  />
    </Routes>
)    

export default authRoutes