import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { Options } from 'styled-icons/evaicons-solid'

const Charts = () => {
    const [chartData, setChartData] = useState([])
    const [chartDates, setChartDates] = useState([])
    const [chartClose, setChartClose] = useState([])

    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/markets/specific_company',
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
        <div>
            <Line 
                data={{
                    labels: chartDates,
                    datasets:[{
                        label: 'Last close',
                        data: chartClose,
                        backgroundColor: '#1F8C76',
                        borderColor: '#1F8C76',
                        fill: true,
                    }]
                }}
                height={400}
                width={600}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales:{
                       x: {
                           ticks: {
                               display: false
                           }
                       }
                    }
                }}
            />
        </div>
    )
}

export default Charts
