import React, { useState, useContext, useEffect } from 'react'
import Auth from '../../Contexts/Auth'
import axios from 'axios'
import styled from 'styled-components'
import 'stylesheets/application.css'

const Wrapper = styled.div`
    position: fixed;
    top: 10vh;
    left: 18vw;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
`
const CurrentBalance = styled.div`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    top: 2rem;
    left: 3rem;
`
const CurrentCash = styled.div`
    display: flex;
    right: 5vw;
    top: 0;
    height: 27%;
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const DepositContainer = styled.div`
    background-color: white;
    height: 65%;
    width: 95%;
    margin-top: 3em;
    display: flex;
    align-items: center;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
`
const DepositField = styled.input`
    border: none;
    outline: none;
    font-size: 4rem;
    width: 20%;
    text-align:center;
`
const DepositHead = styled.h4`
    margin-bottom: 3em;
    font-size: 2.4rem;
    color: #3E3D3D;
`
const DepositText = styled.h2`
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin-top: 2.6em;
    text-align: center;
    width: 60%;
`
const DepositButton = styled.button`
    margin-top: 1em;
    width: 50%;
    border: none;
    background-color: #1F8C76;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    letter-spacing: 0.4px;
    height: 3.2em;
    border-radius: 5px;
    :hover {
        background-color: #2D7264;
        color: #E1E1E1;
    }
`
const FormContainer = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const NewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 100%;
    background-color: white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);

`
const NewsHeadline = styled.h3`
    font-size: 1.2rem;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    text-align: center;
    width: 78%;
`
const NewsImage = styled.img`
    height: 100px;
    width: 300px;
    object-fit: cover;
`
const NewsSource = styled.h5`
    font-size: 0.8rem;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin-top: 0.7rem;
`

const NewsUrl = styled.a`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    font-size: 0.8rem;
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
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/markets/specific_company',
            data: {
                symbol: 'AAPL'
            }
        })
            .then((res) => {
                setNews(res.data.news_company)
                setRefresh(refresh + 1)
            })
            .catch(err => console.log(err))
    }, [news.length])

    return (
        <Wrapper>
            <CurrentCash className="current-cash">
                {news.slice(0, 3).map((item) => {
                    console.log(item)
                    return <NewsContainer className="news">
                        <NewsHeadline>{item.headline}</NewsHeadline>
                        <NewsImage src={item.image} alt="news-image" />
                        <NewsSource>{item.source}</NewsSource>
                        <NewsUrl href={item.url}>read more..</NewsUrl>
                    </NewsContainer>
                })}

            </CurrentCash>
            <DepositContainer className="deposit">
                <FormContainer className="form-container">
                    <DepositHead className='deposit-header'>Deposit Money</DepositHead>
                    <DepositField type="text" autoComplete='off' placeholder='$ 0' onChange={handleDeposit} />
                    <DepositText>How much would you like to deposit?</DepositText>
                    <DepositButton onClick={handleCashIn}>Deposit</DepositButton>
                </FormContainer>
                <div className="wallet-details">
                    <CurrentBalance>Current balance: {balance}</CurrentBalance>
                </div>
            </DepositContainer>
        </Wrapper>
    )
}

export default Wallet
