import React, { useState, useContext } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import AdminContext from '../../Contexts/AdminContext'
import Table from 'react-bootstrap/Table'

const Subject = styled.h4`
    position: absolute;
    top: 10vh;
    left: 18vw;
    color: #3E3D3D;
    font-family: 'Roboto', sans-serif;
`

const TableWrapper = styled.div`
    background-color: white;
    position: absolute;
    top: 15vh;
    right: 2vw;
    left: 18vw;
    bottom: 5vh;
    font-family: 'Roboto', sans-serif;
`

const TableHeaderData = styled.th`
    text-align: center;
    color: white;
    font-weight: 400;
`

const TableBodyData = styled.td`
    text-align: center;
    font-weight: 200;
`

const ActivateButton = styled.button`
    background-color: #1F8C76;
    color: #FFFFFF;
    border: none;
    font-family;
    font-family: 'Roboto', sans-serif;
    height: 2.2rem;
    width: 6.1em;
    border-radius: 4px;

    :hover {
        background-color: #2D7264;
        color: #E1E1E1;
    }
`

const Traders = () => {

    const { refresh, setRefresh, traders, viewTrader, setViewTrader } = useContext(AdminContext)
    const axios = require('axios')
    const isApproved = (stat) => {
        if (stat === 'true') {
            return true
        }
        else {
            return false
        }
    }

    const tradersList = traders.map(trader => {
        const approveTrader = () => {
            axios({
                method: 'patch',
                url: `https://kite-trading.herokuapp.com/api/v1/users/${trader.id}/admins/${trader.id}/approve_account`,
            })
            .then((res) => {
                setRefresh(refresh + 1)
            })
            .catch(err => console.log(err))
        }

        const getTrader = () => {
            setViewTrader({
                modal: true,
                id: trader.id,
                email: trader.email,
                name: trader.name,
                status: trader.status,
                totalCash: trader.total_cash
            })
        }
        
        return(
            <tr key={trader.id} onClick={getTrader}>
                <TableBodyData >{trader.name}</TableBodyData>
                <TableBodyData >{trader.email}</TableBodyData>
                <TableBodyData >{trader.total_cash}</TableBodyData>
                <TableBodyData >
                    {isApproved(trader.status) ? 'Active' : 'Pending'}
                </TableBodyData>
                <TableBodyData>{isApproved(trader.status) ? 'Approved' : <ActivateButton style={{zIndex: '10'}} onClick={approveTrader}>Activate</ActivateButton>}</TableBodyData>
            </tr>
        )
    })

    return (
        <div>
            <Subject>List of traders</Subject>
            <TableWrapper bordered>
                <Table hover>
                    <thead style={{backgroundColor: '#52545B'}}>
                        <tr>
                            <TableHeaderData>Name</TableHeaderData>
                            <TableHeaderData>Email</TableHeaderData>
                            <TableHeaderData>Total Cash</TableHeaderData>
                            <TableHeaderData>Status</TableHeaderData>
                            <TableHeaderData>Account Approval</TableHeaderData>
                        </tr>

                    </thead>
                    <tbody>
                       {tradersList}
                    </tbody>
                </Table>
            </TableWrapper>
        </div>

    )
}

export default Traders
