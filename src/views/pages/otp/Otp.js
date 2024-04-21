import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { verifyotpApi } from 'src/service/apicalls'

const Otp = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const mobileNumber = localStorage.getItem('mobileNumber')
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const exampleToast = (
    <CToast>
      <CToastBody>Sorry! You are not a admin </CToastBody>
    </CToast>
  )
  const submitUser = () => {
    const data = {
      mobile: mobileNumber,
      pin: otp,
    }
    verifyotpApi(data).then((res) => {
      console.log(res)
      if (res.data.admin == 2) {
        console.log('you are a admin')
        localStorage.setItem('userDetails', JSON.stringify(res.data))
        window.location.reload()
      } else {
        console.log('you are a not admin')
        addToast(exampleToast)
      }
    })
  }
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6} sm={8} lg={5} xl={4}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Otp</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Enter otp"
                          autoComplete="Otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={12}>
                          <CButton color="primary" className="px-4" onClick={submitUser}>
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
    </>
  )
}

export default Otp
