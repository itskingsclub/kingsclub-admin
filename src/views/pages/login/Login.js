import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { loginApi } from 'src/service/apicalls'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    mobileNumber: '',
    error: false,
    errorMessage: '',
  })

  const handleInputChange = (key, value) => {
    let errorMessage = ''
    let error = false

    if (key === 'mobileNumber') {
      if (value.length < 1) {
        errorMessage = 'Please enter your mobile number.'
        error = true
      } else {
        const mobileRegex = /^[0-9]{10}$/
        if (mobileRegex.test(value) === false) {
          errorMessage = 'Please enter a valid 10-digit mobile number.'
          error = true
        }
      }
    }

    setUser({
      ...user,
      [key]: value,
      error: errorMessage !== '',
      errorMessage: errorMessage,
    })
  }

  const submitUser = () => {
    if (user.error) {
      return
    }
    console.log(user)
    // Assuming loginApi is a function that makes an API call
    loginApi({ mobile: user.mobileNumber })
      .then((res) => {
        console.log(res)
        if (res.success === true) {
          console.log(user.mobileNumber, res.data.pin)
          // Use history.push to navigate to "/otp" instead of Link component
          navigate.push('/otp')
        } else {
          console.log('false', res.message)
          setUser({
            ...user,
            error: res?.message !== '',
            errorMessage: res?.message,
          })
        }
      })
      .catch((error) => {
        console.error('API call error:', error)
      })
  }

  const handleInputSubmit = () => {
    submitUser()
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Mobile Number"
                        autoComplete="Mobile Number"
                        value={user.mobileNumber}
                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      />
                    </CInputGroup>
                    <p className="text-medium-emphasis text-danger">{user.errorMessage}</p>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          disabled={user.errorMessage !== ''}
                          onClick={handleInputSubmit}
                        >
                          Send Otp
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
