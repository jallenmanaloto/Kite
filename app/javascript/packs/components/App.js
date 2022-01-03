import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminLogin from './Login/AdminLogin'
import Admin from './Dashboard/Admin/Admin'
import Login from './Login/Login'
import Register from './Login/Register'

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login  />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin-dashboard" element={<Admin />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
