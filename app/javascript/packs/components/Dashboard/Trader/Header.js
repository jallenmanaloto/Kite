import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Auth from '../../Contexts/Auth'
import styled from 'styled-components'
import { Notifications } from '@styled-icons/ionicons-sharp'
import { Message } from '@styled-icons/boxicons-solid'
import { Search } from '@styled-icons/boxicons-regular'
import ListGroup from 'react-bootstrap/ListGroup'
import 'stylesheets/application.css'

const Head = styled.div`
    position: fixed;
    height: 6vh;
    top: 0;
    left: 13vw;
    right: 0;
    background-color: white;
    display: flex;
    justify-content: space-between;
`
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 40%;
`
const InputContainer = styled.div`
    height: 2.7rem;
    width: 100%;
    border-radius: 3px;
`
const SearchInput = styled.input`
    height: inherit;
    width: inherit;
    border: none;
    outline: none;
    padding-left: 0.5rem;
`
const UserContainer = styled.div`
    display: flex;
    height: 100%;
    width: 12%;
    justify-content: space-between;
    align-items: center;
    margin-right: 5em;
`

const Header = () => {
    const axios = require('axios')
    const [search, setSearch] = useState('');
    const [stocks, setStocks] = useState([])
    const [refresher, setrefresher] = useState(0)

    const { searchInput, setSearchInput, searchShow, setSearchShow, setSearchStock } = useContext(Auth)

    const handleInputValue = (e) => {
        setSearch(e.target.value)
        setSearchInput(e.target.value)
        setrefresher(refresher + 1)
    }

    useEffect(() => {
        if (searchInput === '') {
            setSearchShow(false)
        }
    }, [refresher])

    const handleKeyDown = (e) => {
        e.key === "Enter" && handleSearch(e);
    }

    const handleSearch = (e) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/search',
            params: {
                search: search
            }
        })
            .then((res) => {
                setSearchStock(res.data.stock)
                setSearchShow(true)
            })
            .catch(err => console.log(err))
    }
    return (
        <Head>
            <SearchContainer className="search">
                <Search style={{
                    height: '1.4rem', color: 'gray', marginLeft: '3rem', marginTop: '0.3rem'
                }} />
                <InputContainer className="input-container">
                    <SearchInput
                        type="text"
                        name="search"
                        id="search"
                        placeholder='Search stock'
                        autoComplete='off'
                        onChange={handleInputValue}
                        onKeyDown={handleKeyDown}
                        onSubmit={handleSearch}
                    />
                </InputContainer>

            </SearchContainer>
            <UserContainer className="user-account">
                <Notifications style={{
                    height: '1.4rem', color: 'gray', cursor: 'pointer'
                }} />
                < Message style={{
                    height: '1.4rem', color: 'gray', cursor: 'pointer'
                }} />
                Trader
            </UserContainer>

        </Head>
    )
}

export default Header
