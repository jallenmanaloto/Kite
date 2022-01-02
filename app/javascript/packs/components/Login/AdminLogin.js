import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Admin from 'images/Admin.jpg'
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
    height: 60vh;
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
    z-index: 10;
    padding-top: 4em;
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
    margin-bottom: 10em;
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
    margin-top: 33%;
`

const SignupText = styled.h5`
    font-size: 1rem;
    font-weight: 300;
    font-family: 'Roboto', sans-serif;
    padding-top: 0.4rem;
    padding-right: 0.3rem;
`

const BgImage = styled.img`
    height: 72vh;
    width: 37vw;
    border-radius: 102px;
    opacity: 18%;
`

const ImageContainer = styled.div`
    position: absolute;
    z-index: 1;
`

const AdminLogin = () => {

    const axios = require('axios');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleKeyDown = (e) => {
        e.key === "Enter" && handleSignIn(e);
    }

    const handleSignIn = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:3000/auth/sign_in',
            data: {
                email: email,
                password: password
            }
        })
            .then((res) => {
                const { "access-token": token } = res.headers
                setUser({
                    email: res.data.data.email,
                    id: res.data.data.id,
                    name: res.data.data.name,
                    client: res.headers.client,
                    access_token: token,
                    expiry: res.headers.expiry,
                    uid: res.headers.uid
                })

            })
            .catch(err => console.log(err))
    }

    return (
        <LoginContainer className='container'>
            <ImageContainer>
                <BgImage src={Admin} alt="background-picture" />
            </ImageContainer>
            <Brand className='brand'>kite</Brand>
            <FormContainer className='loginFormContainer'>
                <Signin>Admin Sign in</Signin>
                <FormComp className='loginForm' action="">
                    <Field>
                        <Label htmlFor="">Email</Label>
                        <Textfield onChange={handleEmail} value={email} type="email" name="email" id="" />
                    </Field>
                    <Field>
                        <Label htmlFor="">Password</Label>
                        <Textfield onKeyDown={handleKeyDown} onChange={handlePassword} value={password} type="text" name="password" id="" />
                    </Field>
                    <Options>
                        <Form>
                            <Form.Check.Input style={{ borderColor: '#595959', cursor: 'pointer' }} type='checkbox' isValid />
                            <Form.Check.Label style={{ paddingLeft: '0.5rem', color: '#595959' }}>Remember me</Form.Check.Label>
                        </Form>
                        <ForgotText>Forgot Password?</ForgotText>
                    </Options>
                    <Button type="submit" onClick={handleSignIn}>Sign In</Button>
                </FormComp>
            </FormContainer>
            <Signup>
                <SignupText>Kite members login</SignupText>
                <Link 
                    to="/"
                    style={{ 
                        color: '#1F8C76', 
                        fontWeight: '500', 
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontFamily: 'Roboto, sans-serif',
                        textDecoration: 'none',
                    }}>here
                </Link>
            </Signup>
        </LoginContainer>
    )
}

export default AdminLogin

