import React, { useState } from 'react'
import AdminContext from '../../Contexts/AdminContext'
import Navbar from './Navbar'
import Header from './Header'
import Traders from './Traders'
import TraderDetails from './TraderDetails'


const Admin = () => {
    const [adminDashboard, setAdminDashboard] = useState(true);
    const [refresh, setRefresh] = useState(0)
    const [traders, setTraders] = useState([]);
    const [viewTrader, setViewTrader] = useState({
        modal: false,
        id: null,
        email: null,
        name: null,
        status: null,
        totalCash: null
    })

    return (
        <div style={{backgroundColor: '#F2F2F2'}}>
            <AdminContext.Provider value={{adminDashboard, setAdminDashboard, refresh, setRefresh, traders, setTraders, viewTrader, setViewTrader}}>
                <Navbar />
                <Header />
                {adminDashboard ? <Traders /> : null }
                <TraderDetails />
            </AdminContext.Provider>
        </div>
    )
}

export default Admin
