import { Button } from '@coreui/coreui'
import React, { useState, useMemo, useEffect, useContext } from 'react'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CImage, CFormSelect, CForm, CFormLabel, CFormInput, CFormFeedback } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { deductCoin, getuser } from 'src/service/apicalls'
import baseaddress from 'src/service/baseAddress'
import { UserContext } from 'src/userDetail/Userdetail'

const User = () => {
  const { id } = useParams()
  const { userDetail } = useContext(UserContext)

  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const fechData = () => {
    getuser(id).then((res) => {
      if (res.success) {
        setUser(res.data)
        console.log("res", res)
      } else {
        console.log("error", res)
      }
    })
  }
  useEffect(() => {
    fechData()
  }, [])
  const [paymentValues, setPaymentValues] = useState({
    amount: { value: '', error: '' },
    remark: { value: '', error: '' },
  });
  const [actionModal, setActionModal] = useState(false);

  const openActionModal = () => {
    setActionModal(true);
  };

  const closeModal = () => {
    setActionModal(false);
  };
  const handleInputChange = (fieldName, value) => {
    const regexPattern = {
      amount: /^\d+$/,
      remark: /^(?:\s*\b\w+\b\s*){0,50}$/,
    }
    let isvalid = true;
    let error = "";
    isvalid = regexPattern[fieldName].test(value);
    error = isvalid ? "" : `Invalid ${fieldName}`;
    setPaymentValues((prevValues) => ({
      ...prevValues,
      [fieldName]: { value, error },
    }));
  };
  const handleFormSubmit = () => {

    const data = {
      admin_id: userDetail.id,
      user_id: user.id,
      amount: Number(paymentValues.amount.value),
      remark: paymentValues.remark.value,
    }
    console.log("data", data)
    deductCoin(data).then((res) => {
      console.log("res.data", res)
      closeModal()
      fechData()
    })
  };

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
          <div className="user-heading d-flex justify-content-between">
            <span>User Info </span>
            <button type="button"
              className="btn btn btn-light" onClick={() => openActionModal()}>Withdraw Coin</button>
          </div>
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
      <CModal
        visible={actionModal}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClick={closeModal}>
          <CModalTitle id="LiveDemoExampleLabel">Action</CModalTitle>
        </CModalHeader>
        <CModalBody className="clearfix">
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="forname">Amount</CFormLabel>
              <CFormInput
                type="text"
                id="forname"
                placeholder="Enter Amount"
                required
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
              <CFormFeedback className='text-danger'>{paymentValues.amount.error}</CFormFeedback>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="forname">Remark</CFormLabel>
              <CFormInput
                type="text"
                id="forname"
                placeholder="Enter Remark"
                required
                onChange={(e) => handleInputChange("remark", e.target.value)}
              />
              <CFormFeedback className='text-danger'>{paymentValues.remark.error}</CFormFeedback>
            </div>
          </CForm>

        </CModalBody>
        <CModalFooter>
          <CButton className='btn btn btn-primary' disabled={paymentValues.amount.value == "" || paymentValues.amount.error != ""} onClick={handleFormSubmit}>
            Submit
          </CButton>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default User
