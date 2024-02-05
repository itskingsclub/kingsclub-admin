import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { challange, getuser } from 'src/service/apicalls'
import baseaddress from 'src/service/baseAddress'

const Challenge = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [challenge, setChallenge] = useState('')
    const fechData = () => {
        challange(id).then((res) => {
            setChallenge(res.data)
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
                    <div className="user-heading">Payment Info</div>
                    <div className="user-info">
                        <div className="user-info-left">
                            <div className="info-item">
                                <span className="info-label">Challenge Id:</span>
                                <span className="info-value">{challenge.id}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Creator:</span>
                                <span className="info-value">{challenge?.creatorUser?.mobile}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Joiner:</span>
                                <span className="info-value">{challenge?.joinerUser?.mobile}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Ceator Result:</span>
                                <span className="info-value">{challenge?.creator_result}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Joiner Result:</span>
                                <span className="info-value">{challenge?.joiner_result}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Challenge Status:</span>
                                <span className="info-value">{challenge?.challenge_status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Challenge
