import React from 'react'
import styled from 'styled-components'
import MyStocks from './MyStocks'

const Wrapper = styled.div`
    position: fixed;
    top: 6vh;
    left: 13vw;
    right: 0;
    bottom: 0;
`

const Dashboard = () => {
    return (
        <Wrapper>
            <MyStocks />
        </Wrapper>
    )
}

export default Dashboard
