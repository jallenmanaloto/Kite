import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Notifications } from '@styled-icons/ionicons-solid'
import { NavDropdown } from 'react-bootstrap'


const Header = () => {
    return (
        <Navbar variant="light" style={{
            width: '85vw', 
            height: '7vh', 
            backgroundColor: 'white', 
            position: 'absolute', 
            right: '0', 
            top: '0',
            display: 'flex',
            justifyContent: 'end'
        }}
        >
            <Notifications style={{
                height: '1.7rem', 
                width: '1.7rem', 
                color: '#3E3D3D', 
                // position: 'absolute', 
                // right: '8em', 
                cursor: 'pointer'}} 
            />
            <NavDropdown 
            title="Account"
            id="accounts"
            className="nav-dropdown"
            style={{marginRight: '4em'}}
            >
                <NavDropdown.Item>Admin setting</NavDropdown.Item>
                <NavDropdown.Item>Admin setting</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    )
}

export default Header
