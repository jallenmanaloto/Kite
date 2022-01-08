import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { Options } from 'styled-icons/evaicons-solid'

const ChartHead = styled.h2`
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
    color: #3E3D3D;
    margin-left: 2rem;
    margin-top: 2rem;
`
const Wrapper = styled.div`
    position: fixed;
    bottom: 2em;
    left: 15vw;
    height: 45%;
    width: 60%;
    background-color: white;
    border: 1px solid white;
    border-radius: 7px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.23);
`
const Charts = () => {
    const [chartData, setChartData] = useState([])
    const [chartDates, setChartDates] = useState([])
    const [chartClose, setChartClose] = useState([])

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://kite-trading.herokuapp.com/api/v1/markets/specific_company',
            data: {
                symbol: 'AAPL'
            }
        })
            .then((res) => {
                setChartData(res.data.charts)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let dates = chartData.map(dates => dates.date)
        let closes = chartData.map(closes => closes.close)

        setChartDates(dates)
        setChartClose(closes)
    }, [chartData])


    return (
        <Wrapper>
            <ChartHead>Apple Inc</ChartHead>
            <Line
                data={{
                    labels: chartDates,
                    datasets: [{
                        label: 'Last close',
                        data: chartClose,
                        backgroundColor: '#1F8C76',
                        borderColor: '#1F8C76',
                        fill: false,
                    }]
                }}
                height={170}
                width={550}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        x: {
                            ticks: {
                                display: false
                            }
                        }
                    }
                }}
            />
        </Wrapper>
    )
}

export default Charts
