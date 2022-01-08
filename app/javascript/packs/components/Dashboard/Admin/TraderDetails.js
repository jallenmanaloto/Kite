import React, { useContext, useState } from 'react'
import AdminContext from '../../Contexts/AdminContext'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const TraderDetails = () => {
    const { refresh, setRefresh, viewTrader, setViewTrader } = useContext(AdminContext)
    const [traderName, setTraderName] = useState('')
    const axios = require('axios')

    const handleClose = () => {
        setViewTrader({ modal: false })
    }

    const handleName = (e) => {
        setTraderName(e.target.value)
    }

    const isApproved = (stat) => {
        if (stat === 'true') {
            return true
        }
        else {
            return false
        }
    }

    const saveDetail = () => {
        axios({
            method: 'patch',
            url: `https://kite-trading.herokuapp.com/api/v1/users/${viewTrader.id - 1}/traders/${viewTrader.id}/edit_trader`,
            data: {
                name: traderName
            }
        })
        .then((res) => {
            setRefresh(refresh + 1)
            handleClose()
        })
    }

    return (
        <div>
            <Modal show={viewTrader.modal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Trader Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="trader-name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="name" onChange={handleName} defaultValue={viewTrader.name}/>
                    </Form.Group>
                    <Form.Group className="trader-email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder={viewTrader.email} disabled/>
                    </Form.Group>
                    <Form.Group className="trader-status">
                        <Form.Label>Account Status</Form.Label>
                        <Form.Control placeholder={isApproved(viewTrader.status) ? 'Active' : 'Pending' } disabled/>
                    </Form.Group>
                    <Form.Group className="trader-cash">
                        <Form.Label>Total Cash</Form.Label>
                        <Form.Control placeholder={viewTrader.totalCash} disabled/>
                    </Form.Group>
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={saveDetail}>Save changes</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TraderDetails
