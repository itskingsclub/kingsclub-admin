import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPaymentById } from 'src/service/apicalls'

const Payment = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [payment, setPayment] = useState('')
    const fechData = () => {
        getPaymentById(id).then((res) => {
            setPayment(res.data)
            console.log("res", res.data)
        })
    }
    useEffect(() => {
        fechData()
    }, [])

    return (
        <>
            <div className="user-info-container mt-3 mb-4">
                <div className="user-details">
                    <div className="user-heading">Deposit Info</div>
                    <div className="user-info">
                        <div className="user-info-left">
                            <div className="info-item">
                                <span className="info-label">Payment Id:</span>
                                <span className="info-value">{payment.id}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Amount:</span>
                                <span className="info-value">{payment?.amount}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Payment Id:</span>
                                <span className="info-value">{payment?.payment_id}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Payment Mode:</span>
                                <span className="info-value">{payment?.payment_mode}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Payment Status:</span>
                                <span className="info-value">{payment?.payment_status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment
