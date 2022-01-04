import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../../../../assets/images/logo.png'
import 'stylesheets/application.css'
import { Dashboard } from '@styled-icons/material-rounded'
import { ArrowGrowth } from '@styled-icons/fluentui-system-regular'
import { Wallet } from '@styled-icons/boxicons-regular'
import { Stock } from '@styled-icons/remix-line'


const Logo = styled.img`
    height: 5rem;
    margin-top: -0.4rem;
    margin-left: 2rem;
    position: absolute;
`
const LogoBrand = styled.h3`
    font-family: 'Righteous', cursive;
    font-size: 2.8rem;
    color: white;
    margin-left: 5.4rem;
`
const LogoContainer = styled.div`
    height: 6vh;
    background-color: #2C3645;
    display: flex;
    position: relative;
`
const Navigation = styled.h3`
    color: ${props => props.active ? '#1F8C76' : 'whitesmoke'};
    font-size: 1.1rem;
    height: 100%;
    line-height: 2.6rem;
    font-weight: 300;
    letter-spacing: 0.2px;
`
const NavGroup = styled.div`
    margin-top: 8em;
`
const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 2.2rem;
    margin-top: 2rem;
    
    cursor: pointer;
`
const Sidenav = styled.div`
    height: 100vh;
    width: 13vw;
    background-color: #394351;
`



const Sidebar = () => {

    const [dashboard, setDashboard] = useState(true)
    const [trade, setTrade] = useState(false)
    const [wallet, setWallet] = useState(false)
    const [myStocks, setMyStocks] = useState(false)

    //handling navigations focus
    const handleDashboard = () => {
        setDashboard(true)
        setTrade(false)
        setWallet(false)
        setMyStocks(false)
    }

    const handleTrade = () => {
        setDashboard(false)
        setTrade(true)
        setWallet(false)
        setMyStocks(false)
    }

    const handleWallet = () => {
        setDashboard(false)
        setTrade(false)
        setWallet(true)
        setMyStocks(false)
    }

    const handleMyStocks = () => {
        setDashboard(false)
        setTrade(false)
        setWallet(false)
        setMyStocks(true)
    }

    return (
        <Sidenav className='sidebar'>
            <LogoContainer className='logo-container'>
                <Logo src={logo} alt="kite-logo" />
                <LogoBrand>kite</LogoBrand>
            </LogoContainer>
            <div className="navigation-container">
                <NavGroup className="navgroup">
                    <NavWrapper className="nav-wrapper" onClick={handleDashboard}>
                        <Dashboard style={{
                            color: `${dashboard ? '#1F8C76' : 'whitesmoke'}`,
                            height: '1.2rem',
                            marginRight: '0.5rem',
                            marginLeft: '1.9rem'
                        }}
                        />
                        <Navigation active={dashboard} className="navigations">Dashboard</Navigation>
                    </NavWrapper>
                    <NavWrapper className="nav-wrapper" onClick={handleTrade}>
                        <ArrowGrowth style={{
                            color: `${trade ? '#1F8C76' : 'whitesmoke'}`,
                            height: '1.2rem',
                            marginRight: '0.5rem',
                            marginLeft: '1.9rem'
                        }}
                        />
                        <Navigation active={trade} className="navigations">Trade</Navigation>
                    </NavWrapper>
                    <NavWrapper className="nav-wrapper" onClick={handleWallet}>
                        <Wallet style={{
                            color: `${wallet ? '#1F8C76' : 'whitesmoke'}`,
                            height: '1.2rem',
                            marginRight: '0.5rem',
                            marginLeft: '1.9rem'
                        }}
                        />
                        <Navigation active={wallet} className="navigations">Wallet</Navigation>
                    </NavWrapper>
                    <NavWrapper className="nav-wrapper" onClick={handleMyStocks}>
                        <Stock style={{
                            color: `${myStocks ? '#1F8C76' : 'whitesmoke'}`,
                            height: '1.2rem',
                            marginRight: '0.5rem',
                            marginLeft: '1.9rem'
                        }}
                        />
                        <Navigation active={myStocks} className="navigations">My Stocks</Navigation>
                    </NavWrapper>`
                </NavGroup>
            </div>
        </Sidenav>
    )
}

export default Sidebar
