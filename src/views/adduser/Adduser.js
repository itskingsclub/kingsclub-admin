import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
    CFormFeedback
} from '@coreui/react'

function Adduser() {
    const [user, setUser] = useState({
        name: { value: "", error: "" },
        mobile: { value: "", error: "" },
        email: { value: "", error: "" },
        role: { value: "", error: "" },
        invite_code: { value: "", error: "" },
    })

    const handleInputChange = (fieldName, value) => {
        const regexPattern = {
            name: /^\w+/,
            email: /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            mobile: /^[0-9]{10}$/,
            role: /^(?!Select\s.*$).+$/,
            invite_code: /^(?:[A-Za-z0-9]{0,2}\d{4})?$/,
        }
        let isvalid = true;
        let error = "";

        if (fieldName === "role") {
            isvalid = value != '3'; // Check if role is selected
            error = isvalid ? "" : "Please select a role";
        } else {
            isvalid = regexPattern[fieldName].test(value);
            error = isvalid ? "" : `Invalid ${fieldName}`;
        }

        setUser((preUser) => ({
            ...preUser,
            [fieldName]: {
                value,
                error
            }
        }))
    }
    console.log("user", user)
    const handleSubmit = () => {
        console.log("user", user)
        const allFields = Object.keys(user).map((key) => user[key].error);
        if (allFields.some((error) => error !== "")) {
            return;
        }
    }

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Add User</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="forname">Full Name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="forname"
                                        placeholder="Enter Your Full name"
                                        required
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                    />
                                    <CFormFeedback className='text-danger'>{user.name.error}</CFormFeedback>

                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="formobilenumber">Mobile Number</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="formobilenumber"
                                        placeholder="Enter Mobile Number"
                                        onChange={(e) => handleInputChange("mobile", e.target.value)}
                                    />
                                    <CFormFeedback className='text-danger'>{user.mobile.error}</CFormFeedback>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="foremailaddress">Email address</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="foremailaddress"
                                        placeholder="name@example.com"
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                    />
                                    <CFormFeedback className='text-danger'>{user.email.error}</CFormFeedback>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="selectrole">Select Role</CFormLabel>
                                    <CFormSelect
                                        aria-label="Default select example"
                                        id="selectrole"
                                        options={[
                                            { label: 'Open this select menu', value: '3' },
                                            { label: 'user', value: '0' },
                                            { label: 'sab-admin', value: '1' },
                                            { label: 'super-admin', value: '2' }
                                        ]}
                                        onChange={(e) => handleInputChange("role", e.target.value)}
                                    />
                                    <CFormFeedback className='text-danger'>{user.role.error}</CFormFeedback>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="forinvitecode">Invite Code</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="forinvitecode"
                                        placeholder="AS56SD"
                                        onChange={(e) => handleInputChange("invite_code", e.target.value)}
                                    />
                                    <CFormFeedback className='text-danger'>{user.invite_code.error}</CFormFeedback>
                                </div>
                                <div className="col-auto">
                                    <CButton type="submit" className="mb-3" disabled={user.name.value == "" || user.name.error !== "" || user.mobile.value == "" || user.mobile.error !== "" || user.role.value == "" || user.role.error !== "" || user.invite_code.error !== "" || user.email.error !== ""}>
                                        Submit
                                    </CButton>
                                </div>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Adduser