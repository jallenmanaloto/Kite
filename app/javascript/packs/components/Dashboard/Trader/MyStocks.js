import React, { useState, useContext, useEffect } from 'react'
import Auth from '../../Contexts/Auth'
import axios from 'axios'
import styled from 'styled-components'
import Table from 'react-bootstrap/Table'
import 'stylesheets/application.css'

const ChartsContainer = styled.div`
    height: 90%;
    width: 44%;
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
    margin-top: 3em;
    margin-right: 1.15em;
`
const StockListItems = styled.td`
    list-style-type: none;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    font-size: 1.15rem;
    text-align: center;
`
const StockListImage = styled.img`
    height: 1.8rem;
    width: 1.8rem;
    border-radius: 50%;
`
const StockListContainer = styled.div`
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
    height: 90%;
    width: 53%;
    margin: 3em 1.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StockListHeader = styled.h2`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin-top: 1em;
`
const TableHead = styled.th`
    text-align: center;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    font-weight: 400;
    
`
const Wrapper = styled.div`
    position: fixed;
    top: 6vh;
    left: 13vw;
    right: 0;
    bottom: 0;
    display: flex;
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
            <tr>
                {/* <StockListImage src={item.company_logo.slice(28, -2)} alt="logo"/> */}
                <StockListItems style={{ paddingLeft: '1rem', display: 'flex' }}><StockListImage src={item.company_logo.slice(28, -2)} alt="logo" /><p style={{ paddingLeft: '0.4rem' }}>{item.name}</p></StockListItems>
                <StockListItems>{item.change_percent}</StockListItems>
                <StockListItems>{`$${item.latest_price}`}</StockListItems>
                <StockListItems>{item.quantity}</StockListItems>
                <StockListItems>{`$${(item.quantity * item.latest_price).toFixed(2)}`}</StockListItems>
            </tr>
        )
    })

    return (
        <Wrapper>
            <StockListContainer className="stock-list-container">
                <StockListHeader>Owned Stocks</StockListHeader>
                <Table style={{ marginTop: '2em' }}>
                    <thead>
                        <tr>
                            <TableHead>Company</TableHead>
                            <TableHead>Change %</TableHead>
                            <TableHead>Last close</TableHead>
                            <TableHead>Shares owned</TableHead>
                            <TableHead>Equity</TableHead>
                        </tr>
                    </thead>
                    <tbody>
                        {stockList}
                    </tbody>
                </Table>
            </StockListContainer>
            <ChartsContainer className="charts-container">

            </ChartsContainer>

        </Wrapper>
    )
}

export default MyStocks
