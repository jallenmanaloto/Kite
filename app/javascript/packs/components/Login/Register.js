import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import MemberLogin from 'images/MemberLogin.jpg'
import 'stylesheets/application.css'
import axios from 'axios'


const LoginContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 66vh;
    width: 500px;
    box-shadow: 7px 8px 29px 6px rgba(0,0,0,0.38);
    border-radius: 16px;
    background-color: white;
    z-index: 10;
`

const FormComp = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 100%;
    margin-top: 2em;
    z-index: 10;
`

const Brand = styled.h1`
    color: #3E3D3D;
    font-size: 5.4em;
    position: absolute;
    top: 3.8rem;
    left: 4rem;
    z-index: 10;
    font-family: 'Righteous', cursive;
    letter-spacing: 0.1em;
`

const Signin = styled.h1`
    margin-bottom: 13.3em;
    position: absolute;
    color: #3E3D3D;
    font-family: 'Roboto', sans-serif;
`

const Field = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    padding-bottom: 2rem;
`

const Label = styled.label`
    color: #595959;
    font-weight: 500;
    padding-bottom: 0.5rem;
    font-family: 'Roboto', sans-serif;
`

const Textfield = styled.input`
    height: 2.6em;
    width: 100%;
    border-radius: 4px;
    border: 1px solid rgba(115, 115, 115, 0.22);
    background-color: #F8F8F8;
    outline: none;
`

const Options = styled.div`
    height: auto;
    width: 80%;
    padding-bottom: 0.3rem;
    display: flex;
    justify-content: space-between;
`

const ForgotText = styled.p`
    font-weight: 500;
    color: #1F8C76;
    cursor: pointer;
`

const Button = styled.button`
    height: 2.6em;
    width: 80%; 
    text-decoration: none;
    background-color: #1F8C76;
    color: #FFFFFF;
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    font-weight: Bold;
    letter-spacing: 0.02rem;
    border-radius: 4px;
    border: none;

    :hover {
        background-color: #2D7264;
        color: #E1E1E1;
    }
`

const Signup = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 10;
    margin-top: 42%;
`

const SignupText = styled.h5`
    font-size: 1rem;
    font-weight: 300;
    font-family: 'Roboto', sans-serif;
    padding-top: 0.4rem;
    padding-right: 0.3rem;
`

const BgImage = styled.img`
    height: 75vh;
    width: 62vw;
    border-radius: 155px;
    opacity: 10%;
`

const ImageContainer = styled.div`
    position: absolute;
    z-index: 1;
`

const Register = () => {

    const axios = require('axios');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState({});

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword =(e) => {
        setConfirmPassword(e.target.value)
    }

    const handleKeyDown = (e) => {
        e.key === "Enter" && handleSignIn(e);
    }

    const handleSignIn = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'https://kite-trading.herokuapp.com/auth',
            data: { user: {
                email: email,
                password: password
                }
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    return (
        <LoginContainer className='container'>
            <ImageContainer>
                <BgImage src={MemberLogin} alt="background-picture" />
            </ImageContainer>
            <Brand className='brand'>kite</Brand>
            <FormContainer className='loginFormContainer'>
                <Signin>Register an account</Signin>
                <FormComp className='loginForm' action="">
                    <Field>
                        <Label htmlFor="">Email</Label>
                        <Textfield onChange={handleEmail} value={email} type="email" name="email" id="email-register" />
                    </Field>
                    <Field>
                        <Label htmlFor="">Name</Label>
                        <Textfield type="text" name="name" id="" />
                    </Field>
                    <Field>
                        <Label htmlFor="">Password</Label>
                        <Textfield onKeyDown={handleKeyDown} onChange={handlePassword} value={password} type="password" name="password" id="password-register" />
                    </Field>
                    <Field>
                        <Label htmlFor="">Confirm password</Label>
                        <Textfield onKeyDown={handleKeyDown} onChange={handleConfirmPassword} value={confirmPassword} type="password" name="confirm-password" id="confirm-password-register" />
                    </Field>
                    <Button type="submit" onClick={handleSignIn}>Sign up</Button>
                </FormComp>
            </FormContainer>
            <Signup>
                <SignupText>Already have a Kite account?</SignupText>
                <Link 
                    to="/"
                    style={{ 
                        color: '#1F8C76', 
                        fontWeight: '500', 
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontFamily: 'Roboto, sans-serif',
                        textDecoration: 'none',
                    }}>Login
                </Link>
            </Signup>
        </LoginContainer>
    )
}

export default Register
