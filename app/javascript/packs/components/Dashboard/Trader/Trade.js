import React, { useState, useEffect, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import styled from 'styled-components'
import 'stylesheets/application.css'

const Histories = styled.div`
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
    margin: 3em 5em 3em 3em;
    width: 38%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const TradesHistory = styled.h3`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin-top: 2em;
`
const Tradings = styled.div`
    background-color: lightblue;
    margin: 3em 3em 3em 5em;
    width: 55%;
    height: 90%;
`
const TransactionAmount = styled.h3`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    font-size: 1.4rem;
    position: absolute;
    left: 88%;
`
const TransactionStock = styled.h3`
    position: absolute;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    font-size: 1.4rem;
    left: 5em;
    width: 36%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`
const TransactionSymbol = styled.h3`
    position: absolute;
    left: 20em;
    font-family: 'Roboto', sans-serif;
    color: gray;
    font-size: 0.9rem;
`
const TransactionType = styled.h3`
    font-family: 'Roboto', sans-serif;
    color: #1F8C76;
    width: 3em;
`
const Wrapper = styled.div`
    position: fixed;
    top: 6vh;
    left: 13vw;
    right: 0;
    bottom: 0;
    display: flex;
`

const Trade = () => {

    useEffect(() => {
        // fetch all stocks of the trader
    }, [])

    return (
        <Wrapper>
            <Tradings className='tradings'>
                <div className='buy-stock'></div>
                <div className='sell-stock'></div>
            </Tradings>
            <Histories className='history'>
                <TradesHistory>Trades History</TradesHistory>
                <ListGroup variant='flush' style={{ width: '85%', margin: '3em 0' }}>
                    <ListGroup.Item style={{ display: 'flex', alignItems: 'center' }}>
                        <TransactionType className='transaction-type'>BUY</TransactionType>
                        <TransactionStock className='stock'>Apple, Inc</TransactionStock>
                        <TransactionSymbol className='symbol'>AAPL</TransactionSymbol>
                        <TransactionAmount className='amount'>$40</TransactionAmount>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <TransactionType className='transaction-type'>BUY</TransactionType>
                        <TransactionStock className='stock'>Tesla</TransactionStock>
                        <TransactionSymbol className='symbol'>TSLA</TransactionSymbol>
                        <TransactionAmount className='amount'>$100</TransactionAmount>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ display: 'flex', alignItems: 'center' }}>
                        <TransactionType className='transaction-type' style={{ color: '#F05C4D' }}>SELL</TransactionType>
                        <TransactionStock className='stock'>Ford</TransactionStock>
                        <TransactionSymbol className='symbol'>F</TransactionSymbol>
                        <TransactionAmount className='amount'>$20</TransactionAmount>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ display: 'flex', alignItems: 'center' }}>
                        <TransactionType className='transaction-type' style={{ color: '#F05C4D' }}>SELL</TransactionType>
                        <TransactionStock className='stock'>Agile Technologies, Inc.</TransactionStock>
                        <TransactionSymbol className='symbol'>A</TransactionSymbol>
                        <TransactionAmount className='amount'>$130</TransactionAmount>
                    </ListGroup.Item>
                </ListGroup>
            </Histories>
        </Wrapper>
    )
}

export default Trade
