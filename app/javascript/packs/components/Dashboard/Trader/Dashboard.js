import React from 'react'
import styled from 'styled-components'
import Charts from './Charts'
import MyStocks from './MyStocks'
import LatestNews from './LatestNews'
import TopMovers from './TopMovers'

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
            <Charts />
            <MyStocks />
            <LatestNews />
            <TopMovers />
        </Wrapper>
    )
}

export default Dashboard
