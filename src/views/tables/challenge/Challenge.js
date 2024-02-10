import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { challange, getuser } from 'src/service/apicalls'
import baseaddress from 'src/service/baseAddress'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CImage, CFormSelect} from '@coreui/react'
const Challenge = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [status, setStatus] = useState(false)
    const [form, setForm] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [challenge, setChallenge] = useState('')
    const [selectedValues, setSelectedValues] = useState({
        creatorResult: '',
        joinerResult: '',
        challengeStatus: '',
      });

    const fechData = () => {
        challange(id).then((res) => {
            setChallenge(res.data)
        })
    }
    useEffect(() => {
        fechData()
    }, [])
    
  const openModal = (status) => {
    if(status === "creator"){
        setStatus(true)
    } else{
        setStatus(false)
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleSelectChange = (fieldName, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleFormSubmit = () => {
    console.log("selectedValues", selectedValues)
    setForm(false);
  };

    return (
        <>
    <button type="button" className="btn btn btn-primary m-3 text-end" onClick={()=>fechData()}>refresh</button>
            <div className="user-info-container mt-3 mb-4">
                <div className="user-details">
                    <div className='d-flex justify-content-between user-heading'>
                    <div>Payment Info</div>
                  { !form && <CButton color="dark" onClick={()=>setForm(true)}>Action</CButton> }  
                    </div>
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
                                {form === false ? 
                                 <span className="info-value">{challenge?.creator_result}</span>
                               : 
                                <CFormSelect style={{width: '100%'}} 
                                aria-label="Default select example"
                                options={[
                                    'Open this select menu',
                                    { label: 'Win', value: 'win' },
                                    { label: 'Lose', value: 'Lose' },
                                    { label: 'Cancel', value: 'Cancel'}
                                ]}
                                onChange={(e) => handleSelectChange('creatorResult', e.target.value)}
                                />
                            }
                            </div>
                            <div className="info-item">
                                <span className="info-label">Ceator Result Image:</span>
                                <span className="info-value">
                                {challenge.creator_result_image !== undefined ? (
                                    <img
                                        src={`${baseaddress}/upload/${challenge.creator_result_image}`}
                                        alt="No Image"
                                        style={{
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'cover',
                                        objectPosition: 'top',
                                        cursor: 'pointer'
                                        }}
                                        onClick={() => openModal("creator")}
                                    />
                                    ) : (
                                    <span>
                                        No image
                                    </span>
                                    )}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Joiner Result:</span>
                                {form === false ? 
                                 <span className="info-value">{challenge?.joiner_result}</span>
                               : 
                                <CFormSelect style={{width: '100%'}} 
                                aria-label="Default select example"
                                options={[
                                    'Open this select menu',
                                    { label: 'Win', value: 'win' },
                                    { label: 'Lose', value: 'Lose' },
                                    { label: 'Cancel', value: 'Cancel'}
                                ]}
                                onChange={(e) => handleSelectChange('joinerResult', e.target.value)}
                                />
                            }
                            </div>
                            <div className="info-item">
                                <span className="info-label">Joiner Result Image:</span>
                                <span className="info-value">
                                {challenge.joiner_result_image !== undefined ? (
                                <img
                                    src={`${baseaddress}/upload/${challenge.joiner_result_image}`}
                                    alt="No Image"
                                    style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    cursor: 'pointer'
                                    }}
                                    onClick={() => openModal("joiner")}
                                />
                                ) : (
                                <span>
                                    No image
                                </span>
                                )}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Challenge Status:</span>
                                {form === false ? 
                                <span className="info-value">{challenge?.challenge_status}</span>
                               : 
                                <CFormSelect style={{width: '100%'}} 
                                aria-label="Default select example"
                                options={[
                                    'Open this select menu',
                                    { label: 'Clear', value: 'Clear' },
                                    { label: 'Review', value: 'Review' },
                                    { label: 'Cancel', value: 'Cancel'}
                                ]}
                                onChange={(e) => handleSelectChange('challengeStatus', e.target.value)}
                                />
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="clearfix text-end me-2">
            { form && <CButton align="end" color="dark" onClick={handleFormSubmit}>Submit</CButton> }  
            </div>

            <CModal
      visible={showModal}
      onClick={closeModal}
      aria-labelledby="LiveDemoExampleLabel"
    >
      <CModalHeader onClick={closeModal}>
        <CModalTitle id="LiveDemoExampleLabel">{status ? "Creator Image Result" : "Joiner result Image"}</CModalTitle>
      </CModalHeader>
      <CModalBody className="clearfix">
      <CImage fluid align="center" src={`${baseaddress}/upload/${status ? challenge.creator_result_image : challenge.joiner_result_image}`} alt="Full Image" />  
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setShowModal(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
        </>
    )
}

export default Challenge
