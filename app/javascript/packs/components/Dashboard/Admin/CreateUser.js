import React, { useState, useContext } from 'react'
import AdminContext from '../../Contexts/AdminContext'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'

const CreateButton = styled.button`
    height: 2.5em;
    width: 9.3em;
    border: none;
    border-radius: 4px;
    background-color: #1F8C76;
    color: white;
    margin-top: 2rem;
    margin-left: 50%;
    transform: translateX(-50%);
    :hover {
        background-color: #2D7264;
        color: #E1E1E1;
    }
`

const Header = styled.h1`
    color: #3E3D3D;
    position: absolute;
    left: 18vw;
    top: 10vh;
    font-family: 'Roboto', sans-serif;
    font-size: 1.5em;
`

const FormContainer = styled.div`
    background-color: white;
    position: absolute;
    height: 55vh;
    left: 18vw;
    top: 15vh;
    right: 5vw;
`

const FormFields = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 3em 2em;
`

const FormHeader = styled.div`
    height: 5vh;
    width: 100%;
    background-color: #52545B;
    display: flex;
    align-items: center
`

const FormLeft = styled.div`
    width: 30%;
    // margin-top: 3em;
    // margin-left: 2em;
`

const FormSubject = styled.h4`
    color: white;
    font-size: 1.1rem;
    padding-left: 1rem;
    letter-spacing: 0.5px;
`

const Issues = styled.div`
    background-color: #52545B;
    position: absolute;
    display: flex;
    align-items: center;
    height: 5vh;
    left: 18vw;
    bottom: 10vh;
    right: 5vw;
    color: white;
`

const IssuesSubject = styled.h4`
    color: white;
    font-size: 1.1rem;
    padding-left: 1rem;
    letter-spacing: 0.5px;
`

const Logs = styled.div`
    background-color: #52545B;
    position: absolute;
    display: flex;
    align-items: center;
    height: 5vh;
    left: 18vw;
    bottom: 18vh;
    right: 5vw;
    color: white;
`

const LogsSubject = styled.h4`
    color: white;
    font-size: 1.1rem;
    padding-left: 1rem;
    letter-spacing: 0.5px;
`

const CreateUser = () => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let today = new Date()
    let current = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`

    // Setting context for refresh
    const { refresh, setRefresh } = useContext(AdminContext)

    // Declaring states
    const [alert, setAlert] = useState(false)
    const [checked, setChecked] = useState(false)
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Handling value of textfields
    const handleName = (e) => {
        setUserName(e.target.value)
    }

    const handleEmail = (e) => {
        setUserEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setUserPassword(e.target.value)
    }

    const handlePasswordConfirm = (e) => {
        setUserPasswordConfirm(e.target.value)
    }

    const handleNickname = (e) => {
        setUserNickname(e.target.value)
    }

    const handleFormReset = () => {
        setUserName('')
        setUserPassword('')
        setUserPasswordConfirm('')
        setUserNickname('')
        setUserEmail('')
    }

    //Handling alert
    const handleAlert = () => {
        setAlert(true)
        setInterval(() => {
            setAlert(false)
        }, 2700)
    }

    // Posting request on Submit
    const axios = require('axios')
    const handleCreateUser = (e) => {
        axios({
            method: 'post',
            url: 'https://kite-trading.herokuapp.com/auth',
            data: {
                user: {
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                    nickname: userNickname
                }
            }
        })
            .then((res) => {
                setRefresh(refresh + 1)
            })
            .catch(err => console.log(err))
            handleAlert()
            handleFormReset()
    }

    return (
        <div>
            <Header>Creating a User</Header>
            <FormContainer className='formContainer'>
                <FormHeader className='formHeader'>
                    <FormSubject>User Details</FormSubject>
                </FormHeader>
                <FormFields className='formFields'>
                    {alert ? 
                        <Alert 
                            variant='success' 
                            style={{
                                position: 'absolute', 
                                top: '3em',
                                marginLeft: '50%', 
                                transform: 'translateX(-50%)'
                            }}>User successfully created!
                        </Alert> : null
                    }
                    <FormLeft>
                        <Form onSubmit={handleCreateUser}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter name' value={userName} onChange={handleName} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control type='text' placeholder='(Optional)' value={userNickname} onChange={handleNickname} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Enter email' value={userEmail} onChange={handleEmail} />
                            </Form.Group>
                        </Form>
                    </FormLeft>
                    <FormLeft>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder='Enter password' value={userPassword} onChange={handlePassword} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Password confirmation</Form.Label>
                                <Form.Control type='password' placeholder='Confirm password' value={userPasswordConfirm} onChange={handlePasswordConfirm} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Total Cash</Form.Label>
                                <Form.Control type='text' placeholder='0.00' disabled />
                            </Form.Group>
                        </Form>
                    </FormLeft>
                    <FormLeft>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Role</Form.Label>
                                <Form.Control type='text' placeholder='Trader' disabled />
                            </Form.Group>
                            <Form.Group className='mb-5'>
                                <Form.Label>Creation date</Form.Label>
                                <Form.Control type='text' placeholder={current} disabled />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Check
                                    type="checkbox"
                                    id='accountApproval'
                                    label='Approve account on creation'
                                    defaultChecked={checked}
                                    onChange={() => setChecked(!checked)}
                                />
                            </Form.Group>
                        </Form>
                    </FormLeft>
                </FormFields>
                <CreateButton onClick={handleCreateUser}>Add user</CreateButton>
            </FormContainer>
            <Logs>
                <LogsSubject>User Logs</LogsSubject>
            </Logs>
            <Issues>
                <IssuesSubject>Issues Reported</IssuesSubject>
            </Issues>
        </div>
    )
}

export default CreateUser
