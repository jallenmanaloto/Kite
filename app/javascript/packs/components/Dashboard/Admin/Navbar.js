import React, { useState, useContext, useEffect } from 'react'
import AdminContext from '../../Contexts/AdminContext'
import axios from 'axios'
import styled from 'styled-components'
import { Dashboard } from '@styled-icons/material-rounded'
import { UserPlus } from '@styled-icons/boxicons-solid'
import 'stylesheets/application.css'


const NavWrapper = styled.div`
    height: 100vh;
    width: 15vw;
    background-color: white;
    color: #3E3D3D;
    position: relative;
`
const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    h1 {
        margin-top: 0.1em;
        font-family: 'Righteous', cursive;
        font-size: 3.4em;
    }
`

const UserContainer = styled.div`
    margin-top: 3em;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #3E3D3D;

    h2 {
        font-size: 1.4rem;
    }

    h4 {
        font-size: 0.8rem;
        margin-left: 0.5rem;
        margin-top: 0.1rem;
    }
`

const Line = styled.hr`
    width: 80%;
    margin-left: 50%;
    margin-top: 1.1rem;
    transform: translateX(-50%);
`

const NavigationsContainer = styled.div`
    margin-top: 3.5em;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #989898;
`

const DashboardNavContainer = styled.div`
    display: flex; 
    align-items: center;
    height: 3.5em;
    width: 100%;
    line-height: 3.5em;

    :hover {
        background-color: rgba(31, 140, 118, 0.08);
    }
`

const CreateUserContainer = styled(DashboardNavContainer)`
`

const DashboardNav = styled.h3`
    font-size: 1.3rem;
    font-weight: 400;
    width: 100%;
    height: 3rem;
    line-height: 3.5rem;
    cursor: pointer;
    color: ${props => props.active ? '#00C29B' : '#989898'};
    
`

const CreateUserNav = styled(DashboardNav)`

`

const Logout = styled.div`
    position: absolute;
    bottom: 4em;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    background-color: #1F8C76;
    border-radius: 4px;
    color: white;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 0.5px;
    cursor: pointer;

    :hover {
        background-color: #2D7264;
        color: #E1E1E1;
    }
`

const Navbar = () => {

    const [createUser, setCreateUser] = useState(false)
    const [dashboard, setDashboard] = useState(true)
    const { setAdminDashboard, refresh, setRefresh, setTraders, traders } = useContext(AdminContext)

    useEffect(() => {
        const axios = require('axios')
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/v1/users'
        })
        .then((res) => {
            setTraders(res.data.trader)
        })
        .catch(err => console.log(err))
    },[traders.length, refresh])
    
    const handleDashboard = () => {
        setDashboard(true)
        setCreateUser(false)
        setAdminDashboard(true)
    }

    const handleCreateUser = () => {
        setCreateUser(true)
        setDashboard(false)
        setAdminDashboard(false)
    }

    return (
        <NavWrapper>
            <LogoContainer>
                <h1 className='logo-name'>Kite</h1>
            </LogoContainer>
            <UserContainer className='name-container'>
                <h2 className='admin-name'>Admin01</h2>
                <h4 className='role'>Admin</h4>
            </UserContainer>
            <Line />
            <NavigationsContainer className='navigations'>
                <DashboardNavContainer>
                    <Dashboard className="dashboard-symbol" style={{
                        color: `${dashboard ? '#00C29B' : '#989898'}`,
                        height: '1.8rem',
                        marginTop: '0.4rem',
                        marginBottom: '0.5rem',
                        paddingRight: '0.4rem',
                        marginLeft: '4em'
                    }} />
                    <DashboardNav active={dashboard} onClick={handleDashboard}>Dashboard</DashboardNav>
                </DashboardNavContainer>
                <CreateUserContainer>
                    <UserPlus style={{
                        color: `${createUser ? '#00C29B' : '#989898'}`,
                        height: '2.1rem',
                        marginTop: '0.4rem',
                        marginBottom: '0.5rem',
                        paddingRight: '0.2rem',
                        marginLeft: '4em'
                    }} />
                    <CreateUserNav className="dashboard-text" active={createUser} onClick={handleCreateUser}>Create user</CreateUserNav>
                </CreateUserContainer>
            </NavigationsContainer>
            <Logout >Logout</Logout>
        </NavWrapper>
    )
}

export default Navbar
