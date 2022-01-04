import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
const SearchList = styled.div`
    list-style-type: none;
    height: 3rem;
    background-color: green;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.4rem 1.5rem;
`
const SearchStock = styled.li`
    font-family: 'Roboto', sans-serif;
    list-style-type: none;
    margin: 0 1rem;
`
const SearchStockSymbol = styled(SearchStock)`
    font-size: 1rem;
`
const Searches = styled.div`
    position: fixed;
    top: 5vh;
    width: 300px;
    min-height: 3rem;
    max-height: 400px;
    background-color: green;
    display: flex;
    flex-direction: column;
    overflowY: scroll;
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
    const [arr, setArr] = useState([])

    const handleInputValue = (e) => {
        setSearch(e.target.value)
    }

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
                setStocks(res.data.stock)
            })
            .catch(err => console.log(err))
    }

    const stockResponse = stocks.map((val, key) => {
        return <SearchList key={val.id}>
            <SearchStock >{val.name}</SearchStock>
            <SearchStockSymbol>{val.symbol}</SearchStockSymbol>
        </SearchList>
    })

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
                        onKeyDown={handleKeyDown}
                        onChange={handleInputValue}
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
            <div style={{ position: 'fixed', top: '7vh', left: '14vw', width: '500px', backgroundColor: 'lightblue' }}>
                {stockResponse}
            </div>
        </Head>
    )
}

export default Header
