import React, { useState, useContext, useEffect } from 'react'
import Auth from '../../Contexts/Auth'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
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
    height: 65%;
    width: 95%;
    margin-top: 3em;
    display: flex;
    align-items: center;
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
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
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
const WalletCurr = styled.h4`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin-top: 8em;
    font-size: 0.8rem;
`
const WalletDetails = styled.div`
    margin-left: 2rem;
    width: 80%;
    height: 100%;
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
    display: flex;
    flex-direction: column;
    align-items: center;
`
const WalletForms = styled.div`
    display: flex;
    width: 90%;
`
const WalletHeader = styled.h4`
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin-top: 4em;
    margin-left: 4em;
`
const WalletHeads = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
`
const WithdrawButton = styled.button`
    margin-top: 3.5em;
    width: 30%;
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
        setBalance(currentUser.total_cash)
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
                <WalletDetails className="wallet-details">
                    <WalletHeads className='headers'>
                        <WalletHeader>Your Wallet</WalletHeader>
                        <WalletCurr>currency: $USD</WalletCurr>
                    </WalletHeads>
                    <WalletForms className='forms'>
                        <div style={{ marginRight: '1rem' }}>
                            <Form style={{ width: '100%', marginLeft: '7em', marginTop: '4em' }}>
                                <Form.Group className='mb-3'>
                                    <Form.Label style={{ fontFamily: 'Roboto, sans-serif', color: '#3E3D3D', fontSize: '1rem' }}>Current balance:</Form.Label>
                                    <Form.Control type='text' placeholder={balance} style={{ paddingLeft: '1.5rem' }} disabled />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label style={{ fontFamily: 'Roboto, sans-serif', color: '#3E3D3D', fontSize: '1rem' }}>Equity:</Form.Label>
                                    <Form.Control type='text' placeholder='$200.00' style={{ paddingLeft: '1.5rem' }} disabled />
                                </Form.Group>
                            </Form>
                        </div>
                        <div style={{ marginLeft: '1rem' }}>
                            <Form style={{ width: '100%', marginLeft: '7em', marginTop: '4em' }}>
                                <Form.Group className='mb-3'>
                                    <Form.Label style={{ fontFamily: 'Roboto, sans-serif', color: '#3E3D3D', fontSize: '1rem' }}>Account Type:</Form.Label>
                                    <Form.Control type='text' placeholder='Premium' style={{ paddingLeft: '1.5rem' }} disabled />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label style={{ fontFamily: 'Roboto, sans-serif', color: '#3E3D3D', fontSize: '1rem' }}>Account Number:</Form.Label>
                                    <Form.Control type='text' placeholder='A-0123456789' style={{ paddingLeft: '1.5rem' }} disabled />
                                </Form.Group>
                            </Form>
                        </div>
                    </WalletForms>
                    <WithdrawButton className='withdraw-btn'>Withdraw</WithdrawButton>
                </WalletDetails>
            </DepositContainer>
        </Wrapper>
    )
}

export default Wallet
