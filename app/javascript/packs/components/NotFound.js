import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import notfound from 'images/notfound.jpg'
import 'stylesheets/application.css'

const BrokenPage = styled.img`
    height: 80vh;
    width: 37vw;
    object-fit: cover;
`
const Home = styled.h1`
    position: absolute;
    bottom: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 1.7rem;
    width: 12em;
    color: #3E3D3D;
    background-color: white;
    text-align: center;
    cursor: pointer;
    :hover {
        color: #1F8C76;
    }
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center
`
const NotFound = () => {
    let navigate = useNavigate()
    const handleHome = () => {
        navigate('/', { replace: true })
    }

    return (
        <Wrapper>
            <BrokenPage src={notfound} alt="404 Page" />
            <Home onClick={handleHome}>Go Home</Home>
        </Wrapper>
    )
}

export default NotFound
