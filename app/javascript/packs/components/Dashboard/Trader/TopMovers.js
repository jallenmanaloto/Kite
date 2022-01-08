import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const MoversContainer = styled.div`
    margin: 0 2em;
    display: flex;
    flex-direction: column;
`
const MoversChange = styled.h3`
    position: absolute;
    left: 20em;
    font-size: 0.85rem;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin: 0;
`
const MoversCompany = styled.h3`
    font-size: 1.1rem;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    width: 60%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 0;
`
const MoversItem = styled.div`
    display: flex;
    position: relative;
    width: 80%;
    justify-content: space-between;
    margin-top: 1.1rem;
`
const MoversName = styled.h3`
    font-size: 0.9rem;
    font-family: 'Roboto', sans-serif;
    color: lightgray;
    margin: 0;
`
const Title = styled.h2`
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: #3E3D3D;
    margin-top: 1rem;
    margin-left: 3rem;
    margin: 1rem 0 0 2rem;
`
const Wrapper = styled.div`
    position: absolute;
    bottom: 2em;
    right: 3em;
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
    height: 48%;
    width: 23%;
`

const TopMovers = () => {

    const [active, setActive] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://kite-trading.herokuapp.com/index'
        })
            .then((res) => {
                setActive(res.data.mostactive.reverse())
            })
            .catch(err => console.log(err))
    }, [])

    const handleChangeColor = (string) => {
        if (string.includes('+')) {
            return true;
        }
    }

    const movers = active.map((company) => {
        return (
            <MoversItem key={company.symbol}>
                <div style={{ display: 'flex', alignItems: 'center', width: '90%' }}>
                    <MoversCompany>{company.company_name}</MoversCompany>
                    <MoversName>{company.symbol}</MoversName>
                </div>
                <MoversChange style={{ color: `${handleChangeColor(company.change_percent_s) ? '#1F8C76' : 'red'}` }}>{company.change_percent_s}</MoversChange>
            </MoversItem>
        )
    })

    return (
        <Wrapper>
            <Title>Top Movers</Title>
            <MoversContainer className="movers-container">
                {movers}
            </MoversContainer>
        </Wrapper>
    )
}

export default TopMovers
