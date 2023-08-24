import React from "react"
import { Routes, Route } from "react-router-dom"
import Arcles from '../Pages/Arcles.page'
import Author from '../Pages/Author.page'
import Arcle from '../Pages/Arcle.page'
import Auth from "../Pages/Auth.page"
import TokenPage from "../Pages/TokenPage"
import Confirm from "../Pages/Confirm.page"
import Wait from "../Pages/Wait.page"


const notAuthRoutes = (
    <Routes>
        <Route path="/" element={<Arcles />} exact />
        <Route path="/auth" element={<Auth />} exact />
        <Route path="/author/:id" element={<Author />} exact />
        <Route path="/arcle/:id" element={<Arcle />} exact />
        <Route path="/window" element={<TokenPage />} exact />
        <Route path="/confirm" element={<Confirm />} exact />
        <Route path="/wait" element={<Wait />} exact />
        <Route path="*" element={<Arcles />} exact  />
    </Routes>
)

export default notAuthRoutes
