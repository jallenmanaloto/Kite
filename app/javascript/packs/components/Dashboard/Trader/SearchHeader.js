import React, { useContext, useEffect } from 'react'
import Auth from '../../Contexts/Auth'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: fixed;
    top: 7vh;
    left: 14vw;
    width: 500px;
    background-color: lightblue;
    min-height: 0;
    max-height: 350px;
    overflowY: scroll;
`
const SearchList = styled.div`
    list-style-type: none;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.4rem 1.5rem;
    cursor: pointer;
    border-radius: 6px;
    :hover {
        background-color: green;
    }
`
const StockRes = styled.li`
    font-family: 'Roboto', sans-serif;
    list-style-type: none;
    margin: 0 1rem;
`
const StockSymbol = styled(StockRes)`
    font-size: 0.6rem;
`

const SearchHeader = () => {
    const { searchInput, searchStock } = useContext(Auth)

    return (
        <div>
            <Wrapper>
                {searchStock.map((val) => {
                    return (
                        <SearchList key={val.id}>
                            <StockRes>{val.name}</StockRes>
                            <StockSymbol>{val.symbol}</StockSymbol>
                        </SearchList>
                    )
                })}
            </Wrapper>

        </div>
    )
}

export default SearchHeader
