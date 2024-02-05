import React from 'react'
import { useParams, navigate, useNavigate } from 'react-router-dom'
const Backstatement = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  console.log('id', id)
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate(`/user/${id}/profile`)}
        >
          Profile
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate(`/user/${id}/bethistory`)}
        >
          Bet Histroy
        </button>
        <button className="btn btn-primary active" type="button">
          Account Statement
        </button>
      </div>
    </>
  )
}

export default Backstatement
