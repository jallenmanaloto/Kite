import React from 'react'
import Card from 'react-bootstrap/Card'

const BuySearchCard = ({ search, market }) => {
    console.log(search)
    console.log(market)
    return (
        <Card style={{ width: '29%', minHeight: '1rem', maxHeight: '20%', position: 'absolute', top: '10.5em', backgroundColor: '#F8F8F8' }}>
            {market.map((val) => {
                return (<Card.Text key={val.id} style={{ margin: '0 1.2rem', cursor: 'pointer' }}>{val.name}</Card.Text>)
            })}
        </Card>
    )
}

export default BuySearchCard
