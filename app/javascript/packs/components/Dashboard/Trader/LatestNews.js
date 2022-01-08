import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const NewsContainer = styled.div`
    margin-top: 1rem;
    width: 29%;
    heigth: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
`
const NewsHeader = styled.h3`
    position: absolute;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    color: #3E3D3D;
    top: 1.3rem;
    left: 2rem;
`
const NewsImage = styled.img`
    height: 5em;
    width: 14em;
    margin 1.4rem 0;
`
const NewsTitle = styled.h4`
    font-size: 0.85rem;
    font-weight; 500;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    text-align: center;
    width: 70%;
`
const NewsUrl = styled.a`
    font-size: 0.75rem;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin-bottom: 1rem;
`
const Wrapper = styled.div`
    margin-top: 1.2em;
    margin-left: 2.3em;
    width: 69%;
    height: 45%;
`

const LatestNews = () => {
    const [news, setNews] = useState([])

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://kite-trading.herokuapp.com/api/v1/markets/specific_company',
            data: {
                symbol: 'TSLA'
            }
        })
            .then((res) => {
                setNews(res.data.news_company)
            })
            .catch(err => console.log(err))
    }, [news.length])

    const NewsList = news.slice(0, 3).map((item) => {
        return (
            <NewsContainer>
                <NewsImage src={item.image} alt="" />
                <NewsTitle>{item.headline}</NewsTitle>
                <NewsUrl href={item.url}>see more..</NewsUrl>
            </NewsContainer>
        )
    })

    return (
        <Wrapper>
            <NewsHeader>Recent News</NewsHeader>
            <div className="news-container" style={{ marginTop: '3rem', display:'flex', justifyContent: 'space-around' }}>
                {NewsList}
            </div>
        </Wrapper>
    )
}

export default LatestNews
