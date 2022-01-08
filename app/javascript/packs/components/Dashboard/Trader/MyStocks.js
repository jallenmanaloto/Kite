import React, { useState, useContext, useEffect } from 'react'
import Auth from '../../Contexts/Auth'
import axios from 'axios'
import styled from 'styled-components'
import Table from 'react-bootstrap/Table'
import 'stylesheets/application.css'

const StockChanges = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    margin-left: 3.5rem;
`
const StockChangePercent = styled.h5`
    font-size: 0.75rem;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
`
const StockCompany = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: start;
    justify-content: center;
    margin-left: 2rem;
`
const StockEquity = styled.h4`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    font-size: 1rem;
    padding: 0;
    margin: 0;
`
const StockItems = styled.div`
    display: flex;
    align-items: center;
    height: 3rem;
    margin-top: 1rem;
`
const StockListItems = styled.h4`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    font-size: 1.15rem;
    padding: 0;
    margin: 0;
`
const StockListImage = styled.img`
    height: 2.1rem;
    width: 2.1rem;
    border-radius: 50%;
    margin-left: 2rem;
`
const StockListContainer = styled.div`
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
    height: 100%;
    width: 100%;
    margin-top: 3em;
    display: flex;
    flex-direction: column;
    align-items: start;
`
const StockListHeader = styled.h2`
    font-family: 'Roboto', sans-serif;
    font-size: 1.7rem;
    color: #3E3D3D;
    margin-top: 1em;
    padding-left: 2rem;
`
const StockSymbol = styled.h5`
    font-family: 'Roboto', sans-serif;
    font-size: 0.8rem;    
    color: #3E3D3D;
    padding: 0;
    margin: 0;
`
const TableContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
`
const Wrapper = styled.div`
    position: fixed;
    right: 3em;
    top: 3em;
    height: 40%;
    width: 20%;
`


const MyStocks = () => {
    const { currentUser, setCurrentUser } = useContext(Auth)
    const [allStocks, setAllStocks] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/v1/users/2/traders/1/all_stocks'
        })
            .then((res) => {
                setAllStocks(res.data.stocks)

            })
            .catch(err => console.log(err))
    }, [])

    const stockList = allStocks.map((item) => {
        return (
            <StockItems key={item.id}>
                <StockListImage src={item.company_logo.slice(28, -2)} alt="logo" />
                <StockCompany>
                    <StockListItems>{item.name}</StockListItems>
                    <StockSymbol>{item.symbol}</StockSymbol>
                </StockCompany>
                <StockChanges>
                    <StockEquity>{`$${(item.quantity * item.latest_price).toFixed(2)}`}</StockEquity>
                    <StockChangePercent>{`${item.change_percent}%`}</StockChangePercent>
                </StockChanges>
            </StockItems>
        )
    })

    return (
        <Wrapper>
            <StockListContainer className="stock-list-container">
                <StockListHeader>My Stocks</StockListHeader>
                <TableContainer>
                    {stockList}
                </TableContainer>
            </StockListContainer>
        </Wrapper>
    )
}

export default MyStocks
