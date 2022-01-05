import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import styled from 'styled-components'
import 'stylesheets/application.css'

const BuyButton = styled.button`
    margin-top: 1rem;
    width: 22%;
    border: none;
    background-color: #1F8C76;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    letter-spacing: 0.4px;
    height: 2.7em;
    border-radius: 5px;
    :hover {
        background-color: #2D7264;
        color: #E1E1E1;
    }
`
const BuyStock = styled.div`
    height: 48%;
    width: 100%;
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
    display: flex;
    flex-direction: column;
    align-items: center;
`
const BuyStockHeader = styled.h2`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin-top: 1em;
    padding-bottom: 0.3rem;
`
const BuyStockInput = styled.input`
    outline: none;
    border: none;
    background-color: #F8F8F8;
    border-radius: 15px;
    height: 2.1rem;
    width: 60%;
    padding-left: 1.5rem;
`
const FormGroupOne = styled.div`
    width: 45%;
    margin-left: 2.2rem;
`
const FormGroupTwo = styled.div`
    width: 45%;
`
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
const SellStock = styled.div`
    height: 48%;
    width: 100%;
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
`
const TradesHistory = styled.h3`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin-top: 2em;
`
const Tradings = styled.div`
    margin: 3em 3em 3em 5em;
    width: 55%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

    const [history, setHistory] = useState([])
    const [userStocks, setUserStocks] = useState([])

    const allStocks = 'http://localhost:3000/api/v1/users/2/traders/1/all_stocks'
    const allHistory = 'http://localhost:3000/api/v1/users/2/traders/1/histories'

    const getStocks = axios.get(allStocks)
    const getHistories = axios.get(allHistory)

    useEffect(() => {
        axios.all([getStocks, getHistories])
        .then(axios.spread((...res) => {
            console.log(res)
            setHistory(res[1].data.history)
            setUserStocks(res[0].data.stocks)
        }))
        .catch(err => console.log(err))
    }, [])

    console.log(history)
    console.log(userStocks)

    const handleBuyStock = (e) => {
        e.preventDefault()
        axios({
            method: 'patch',
            url: 'http://localhost:3000/api/v1/users/2/traders/1/buy_stock',
            data: {
                symbol: 'AAPL',
                amount_bought: 20
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    return (
        <Wrapper>
            <Tradings className='tradings'>
                <BuyStock className='buy-stock'>
                    <BuyStockHeader>Buy a stock</BuyStockHeader>
                    <BuyStockInput type="text" placeholder='search a stock' />
                    <Form style={{ width: '90%', display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                        <FormGroupOne>
                            <Form.Group className='mb-3'>
                                <Form.Label>Company</Form.Label>
                                <Form.Control type='text' value='Apple, Inc.' style={{ width: '70%' }} disabled />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Symbol</Form.Label>
                                <Form.Control type='text' value='AAPL' style={{ width: '70%' }} disabled />
                            </Form.Group>
                        </FormGroupOne>
                        <FormGroupTwo>
                            <Form.Group className='mb-3'>
                                <Form.Label>Latest Price</Form.Label>
                                <Form.Control type='text' value='127.12' style={{ width: '70%' }} disabled />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Industry</Form.Label>
                                <Form.Control type='text' value="Technology" style={{ width: '70%' }} disabled />
                            </Form.Group>
                        </FormGroupTwo>
                        <FormGroupTwo>
                            <Form.Group className='mb-3'>
                                <Form.Label>Change percent</Form.Label>
                                <Form.Control type='text' value='+27%' style={{ width: '70%' }} disabled />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Amount to buy</Form.Label>
                                <Form.Control type='text' style={{ width: '70%' }} />
                            </Form.Group>
                        </FormGroupTwo>
                    </Form>
                    <BuyButton onClick={handleBuyStock}>Buy</BuyButton>
                </BuyStock>
                <SellStock className='sell-stock'></SellStock>
            </Tradings>
            <Histories className='history'>
                <TradesHistory>Trades History</TradesHistory>
                <ListGroup variant='flush' style={{ width: '85%', margin: '3em 0' }}>
                    {history.map((val) => {
                        return(
                            <ListGroup.Item style={{ display: 'flex', alignItems: 'center' }}>
                                <TransactionType className='transaction-type'>{val.transaction_name.toUpperCase()}</TransactionType>
                                <TransactionStock className='stock'>{val.stock_name}</TransactionStock>
                                <TransactionSymbol className='symbol'>{val.symbol}</TransactionSymbol>
                                <TransactionAmount className='amount'>{val.quantity}</TransactionAmount>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Histories>
        </Wrapper>
    )
}

export default Trade
