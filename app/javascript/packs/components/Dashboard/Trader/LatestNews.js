import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const NewsContainer = styled.div`
    position: relative;
    margin-top: 1rem;
    margin-left: 4.5em;
    width: 65%;
    heigth: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    height: 23%;
    width: 75%;
`
const NewsTitle = styled.h4`
    font-size: 0.9rem;
    font-weight; 500;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    text-align: center
`
const NewsUrl = styled.a`
    font-size: 0.75rem;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
`
const Wrapper = styled.div`
    position: fixed;
    bottom: 2em;
    right: 3em;
    width: 20%;
    height: 45%;
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
`

const LatestNews = () => {
    const [news, setNews] = useState([])

    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/markets/specific_company',
            data: {
                symbol: 'TSLA'
            }
        })
            .then((res) => {
                setNews(res.data.news_company)
            })
            .catch(err => console.log(err))
    }, [news.length])

    const NewsList = news.slice(0, 2).map((item) => {
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
            <div className="news-container" style={{ marginTop: '3rem' }}>
                {NewsList}
            </div>
        </Wrapper>
    )
}

export default LatestNews
