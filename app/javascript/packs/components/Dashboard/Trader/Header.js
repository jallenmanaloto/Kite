import React from 'react'
import styled from 'styled-components'
import { Notifications } from '@styled-icons/ionicons-sharp'
import { Message } from '@styled-icons/boxicons-solid'
import { Search } from '@styled-icons/boxicons-regular'

const Head = styled.div`
    position: fixed;
    height: 6vh;
    top: 0;
    left: 13vw;
    right: 0;
    background-color: white;
    display: flex;
    justify-content: space-between;
`
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 40%;
`
const InputContainer = styled.div`
    height: 2.7rem;
    width: 100%;
    border-radius: 3px;
`
const SearchInput = styled.input`
    height: inherit;
    width: inherit;
    border: none;
    outline: none;
    padding-left: 0.5rem;
`
const UserContainer = styled.div`
    display: flex;
    height: 100%;
    width: 12%;
    justify-content: space-between;
    align-items: center;
    margin-right: 5em;
`

const Header = () => {
    return (
        <Head>
            <SearchContainer className="search">
                <Search style={{
                    height: '1.4rem', color: 'gray', marginLeft: '3rem', marginTop: '0.3rem'
                }} />
                <InputContainer className="input-container">
                    <SearchInput type="text" name="search" id="search" placeholder='Search stock' autoComplete='off' />
                </InputContainer>

            </SearchContainer>
            <UserContainer className="user-account">
                <Notifications style={{
                    height: '1.4rem', color: 'gray', cursor: 'pointer'
                }} />
                < Message style={{
                    height: '1.4rem', color: 'gray', cursor: 'pointer'
                }} />
                Trader
            </UserContainer>
        </Head>
    )
}

export default Header
