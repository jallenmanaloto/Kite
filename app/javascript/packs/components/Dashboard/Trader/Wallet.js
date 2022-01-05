import React, { useState, useContext, useEffect } from 'react'
import Auth from '../../Contexts/Auth'
import axios from 'axios'
import styled from 'styled-components'
import 'stylesheets/application.css'

const Wrapper = styled.div`
    position: fixed;
    top: 16vh;
    left: 18vw;
    right: 0;
    bottom: 0;
`
const CurrentBalance = styled.div`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    position: absolute;
    top: 2rem;
    left: 3rem;
`
const CurrentCash = styled.div`
    position: absolute;
    right: 5vw;
    top: 0;
    height: 85%;
    width: 50%;
    background-color: white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
    display: flex;
    flex-direction: column;
    align-items: center;
`
const DepositContainer = styled.div`
    background-color: white;
    height: 85%;
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
`
const DepositField = styled.input`
    width: 40%;
    border: none;
    outline: none;
    height: 25%;
    font-size: 8rem;
    margin-top: 9rem;
`
const DepositText = styled.h2`
    font-size: 2rem;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    width: 70%;
    margin-top: 3.6em;
    text-align: center;
`
const DepositButton = styled.button`
    margin-top: 2em;
    width: 70%;
    border: none;
    background-color: #1F8C76;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    letter-spacing: 0.4px;
    height: 4em;
    border-radius: 5px;
    :hover {
        background-color: #2D7264;
        color: #E1E1E1;
    }
`
const NewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 40%;
    background-color: green;

`
const NewsHeadline = styled.h2`

`

const Wallet = () => {

    const [deposit, setDeposit] = useState(0)
    const [refresh, setRefresh] = useState(0)
    const [balance, setBalance] = useState()
    const [news, setNews] = useState([])
    const { currentUser } = useContext(Auth)

    const handleDeposit = (e) => {
        setDeposit(e.target.value)
    }

    const handleCashIn = () => {
        axios({
            method: 'patch',
            url: 'http://localhost:3000/api/v1/users/2/traders/1/deposit_money', // change to current user's id
            data: {
                total_cash: deposit
            }
        })
            .then((res) => {
                console.log(res.data)
                setDeposit(0)
                setRefresh(refresh + 1)
                setBalance(res.data.trader.total_cash)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // setBalance()
        console.log(balance)
    }, [refresh])

    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/markets/specific_company',
            data: {
                symbol: 'AAPL'
            }
        })
            .then((res) => {
                console.log(res.data.news_company)
                setNews(res.data.news_company)
            })
            .catch(err => console.log(err))
    }, [refresh])

    return (
        <Wrapper>
            <DepositContainer className="deposit">
                <CurrentBalance>Current balance: {balance}</CurrentBalance>
                <DepositField type="text" autoComplete='off' placeholder='$ 0' onChange={handleDeposit} />
                <DepositText>How much would you like to deposit?</DepositText>
                <DepositButton onClick={handleCashIn}>Deposit</DepositButton>
            </DepositContainer>
            <CurrentCash className="current-cash">
                <NewsContainer className="news">
                    <h3>{news.headline}</h3>
                    <img src={news.image} alt="news-image" />
                    <h5>{news.source}</h5>
                    <a href={news.url}>read more..</a>
                </NewsContainer>
            </CurrentCash>
        </Wrapper>
    )
}

export default Wallet
