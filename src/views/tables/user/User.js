import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getuser } from 'src/service/apicalls'
import baseaddress from 'src/service/baseAddress'

const User = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const fechData = () => {
    getuser(id).then((res) => {
      setUser(res.data)
    })
  }
  console.log('user', user)
  useEffect(() => {
    fechData()
  }, [])

  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <button className="btn btn-primary active" type="button">
          Profile
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate(`/user/${id}/bethistory`)}
        >
          Bet Histroy
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate(`/user/${id}/bankstatement`)}
        >
          Account Statement
        </button>
      </div>
      <div className="user-info-container mt-4 mb-4">
        <div className="user-details">
          <div className="user-heading">User Info</div>
          <div className="user-info">
            <div className="user-info-left">
              <div className="info-item">
                <span className="info-label">User ID:</span>
                <span className="info-value">{user.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Profile:</span>
                <span className="info-value">
                  {user?.profile !== null ? (
                    <img
                      src={`${baseaddress}/upload/${user?.profile}`}
                      alt="Profile"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                      }}
                    />
                  ) : (
                    <div className="avatar avatar-lg bg-secondary">
                      {(user?.name).split('')[0].toUpperCase()}
                    </div>
                  )}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Mobile:</span>
                <span className="info-value">{user.mobile}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Game Coin:</span>
                <span className="info-value">{user.game_coin}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Refer Coin:</span>
                <span className="info-value">{user.refer_coin}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Win Coin:</span>
                <span className="info-value">{user.win_coin}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Invite Code:</span>
                <span className="info-value">{user.invite_code}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">{user.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
