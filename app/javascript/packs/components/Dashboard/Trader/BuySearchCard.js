import React, { useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'

const BuySearchCard = ({ setSearch, market, setBuyDetails }) => {

    return (
        <Card style={{ width: '29%', minHeight: '1rem', maxHeight: '20%', position: 'absolute', top: '10.5em', backgroundColor: '#F8F8F8' }}>
            {market.map((val) => {
                const handleBuyDetails = () => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:3000/api/v1/markets/specific_company',
                        data: {
                            symbol: val.symbol
                        }
                    })
                        .then((res) => {
                            const { "company_name": name } = res.data.company_info
                            const { symbol } = res.data.company_info
                            const { industry } = res.data.company_info

                            setBuyDetails({
                                name: name,
                                change_percent: res.data.change_percent,
                                latest_price: res.data.latest_price,
                                symbol: symbol,
                                industry: industry
                            })
                        })
                        .catch(err => console.log(err))
                    setSearch('')
                }

                return (<Card.Text key={val.id} style={{ margin: '0 1.2rem', cursor: 'pointer' }} onClick={handleBuyDetails}>{val.name}</Card.Text>)
            })}
        </Card>
    )
}

export default BuySearchCard
