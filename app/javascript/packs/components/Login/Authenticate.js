import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from '../Contexts/Auth'
import Login from './Login'
import Register from './Register'
import AdminLogin from './AdminLogin'
import Admin from '../Dashboard/Admin/Admin'

const Authenticate = () => {
    const [auth, setAuth] = useState(false)

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
    )
}

export default Authenticate
