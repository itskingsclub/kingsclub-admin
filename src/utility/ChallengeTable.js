import React, { useState, useMemo, useEffect, useContext } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { clearChallenge, getAllUsers, getChallange, getReviewChallange } from 'src/service/apicalls'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CImage, CFormSelect, CForm, CFormLabel, CFormInput } from '@coreui/react'
import baseAddress from 'src/service/baseAddress'
import { useNavigate } from 'react-router-dom'
import baseaddress from 'src/service/baseAddress'
import { UserContext } from 'src/userDetail/Userdetail'

const ChallengeTable = ({ apiEndpoint }) => {
    //should be memoized or stable
    const { userDetail } = useContext(UserContext)
    const navigate = useNavigate()
    const [challenges, setChallenges] = useState([])
    const [rowCount, setRowCount] = useState(10)
    const [columnFilters, setColumnFilters] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([{ desc: false, id: apiEndpoint === 'challenge' ? 'id' : 'challenge_status' }])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [selectedValues, setSelectedValues] = useState({
        creatorResult: '',
        joinerResult: '',
        challengeStatus: '',
    });
    const [challengedata, setChallengedata] = useState({})

    const [status, setStatus] = useState(false)
    const [image, setImage] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [actionModal, setActionModal] = useState(false);

    const openModal = (image, status) => {
        console.log("status", status)
        setImage(image)
        if (status === "creator_result_image") {
            setStatus(true)
        } else {
            setStatus(false)
        }
        setShowModal(true);
    };
    const openActionModal = (data) => {
        setActionModal(true);
        console.log("data", data)
        setChallengedata(data)
    };

    const closeModal = () => {
        setShowModal(false);
        setActionModal(false);
    };
    const handleSelectChange = (fieldName, value) => {
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };
    const handleFormSubmit = () => {
        const data = {
            admin_id: userDetail.id,
            id: challengedata.id,
            creator_result: selectedValues.creatorResult,
            joiner_result: selectedValues.joinerResult,
            challenge_status: selectedValues.challengeStatus,
            updated_by: userDetail.id,
        }
        console.log("data", data)
        clearChallenge(data).then((res) => {
            console.log("res.data", res.data)
            closeModal()
            fechData()
        })
    };
    const fechData = async () => {
        const data = {
            offset: pagination.pageIndex * pagination.pageSize,
            limit: pagination?.pageSize,
            sort: sorting.length > 0 ? sorting[0]?.id : "id",
            order: sorting.length > 0 ? sorting[0].desc ? 'ASC' : 'DESC' : 'ASC',
        }
        try {
            let res;
            if (apiEndpoint === 'challenge') {
                res = await getChallange(data);
            } else if (apiEndpoint === 'reviewChallenge') {
                res = await getReviewChallange(data);
            }
            setChallenges(res.data.challenges);
            console.log(res)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fechData()
    }, [pagination, sorting])

    const payemntTable = useMemo(
        () => [
            {
                accessorKey: 'id', //access nested data with dot notation

                header: 'Id',

                size: 50,
            },
            {
                accessorKey: 'creatorUser', //access nested data with dot notation

                header: 'creator User',

                size: 30,
            },
            {
                accessorKey: 'joinerUser', //access nested data with dot notation

                header: 'Joiner User',

                size: 100,
            },
            {
                accessorKey: 'room_code', //access nested data with dot notation

                header: 'Room Code',

                size: 100,
            },

            {
                accessorKey: 'creator_result',

                header: 'Creator Result',

                size: 200,
            },
            {
                accessorKey: 'creator_result_image',

                header: 'Creator Result Image',

                size: 200,
            },
            {
                accessorKey: 'joiner_result',

                header: 'Joiner Result',

                size: 200,
            },
            {
                accessorKey: 'joiner_result_image',

                header: 'Joiner Result Image',

                size: 200,
            },
            {
                accessorKey: 'challenge_status',

                header: 'Challenge Status',

                size: 200,
            },
            {
                accessorKey: 'action',

                header: 'Action',

                size: 200,
            },
        ],

        [],
    )
    // console.log('column', columns)

    // Map the users data to match the expected format
    const formattedData = useMemo(() => {
        return challenges.map((payment) => ({
            id: payment.id,
            creatorUser: payment.creatorUser?.mobile,
            creatorUserId: payment.creatorUser?.id,
            joinerUserId: payment.joinerUser?.id,
            room_code: payment.room_code,
            creator_result_image: payment.creator_result_image,
            joinerUser: payment.joinerUser?.mobile,
            joiner_result_image: payment.joiner_result_image,
            creator_result: payment.creator_result,
            joiner_result: payment.joiner_result,
            challenge_status: payment.challenge_status,
        }))
    }, [challenges])

    const columns = useMemo(
        () =>
            payemntTable.map((item) => {
                if (item.accessorKey === 'creator_result_image' || item.accessorKey === 'joiner_result_image') {
                    return {
                        ...item,
                        Cell: ({ row }) => (
                            <>
                                {row?.original[item.accessorKey] !== undefined ? (
                                    <img
                                        src={`${baseAddress}/upload/${row?.original[item.accessorKey]}`}
                                        alt="No Image"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            objectPosition: 'top',
                                        }}
                                        onClick={() => openModal(row?.original[item.accessorKey], item.accessorKey)}
                                    />
                                ) : (
                                    <span>
                                        No image
                                    </span>
                                )}
                            </>
                        ),
                    };
                }
                if (item.header === 'Action') {
                    return {
                        ...item,
                        Cell: ({ row }) => (
                            <>
                                {row?.original?.challenge_status !== "Clear" &&
                                    <button
                                        type="button"
                                        className="btn btn btn-primary me-2"
                                        onClick={() => openActionModal(row?.original)}
                                    >
                                        Action
                                    </button>
                                }
                                <button
                                    type="button"
                                    className="btn btn btn-primary"
                                    onClick={() => navigate(`/challenge/${row?.original?.id}`)}
                                >
                                    Status
                                </button>
                            </>
                        ),
                    }
                }
                if (item.accessorKey === 'creatorUser' || item.accessorKey === 'joinerUser') {
                    return {
                        ...item,
                        Cell: ({ row }) => (
                            <a className='link'
                                onClick={() => navigate(`/user/${row?.original?.[item.accessorKey + 'Id']}/profile`)}
                            >
                                {row?.original?.[item.accessorKey]}
                            </a>
                        ),
                    }
                }
                return item
            }),
        [challenges],
    )

    return (
        <>
            <button type="button" className="btn btn btn-primary mb-3 text-end" onClick={() => fechData()}>refresh</button>
            <MaterialReactTable
                columns={columns}
                data={formattedData}
                getRowId={(row) => row.id}
                initialState={{ showColumnFilters: false, density: 'compact' }}
                manualFiltering
                manualPagination
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                rowCount={rowCount}
                enableStickyHeader
                enableStickyFooter
                state={{
                    columnFilters,
                    globalFilter,
                    pagination,
                    sorting,
                    enableStickyHeader: true,
                }}
                muiSearchTextFieldProps={{
                    placeholder: `Search Number`,
                }}
            />

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
                            <CFormLabel htmlFor="exampleFormControlInput1">Creator result</CFormLabel>
                            <CFormSelect style={{ width: '100%' }}
                                aria-label="Default select example"
                                options={[
                                    'Open this select menu',
                                    { label: 'Win', value: 'Win' },
                                    { label: 'Lose', value: 'Lose' },
                                    { label: 'Cancel', value: 'Cancel' }
                                ]}
                                onChange={(e) => handleSelectChange('creatorResult', e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Joiner result</CFormLabel>
                            <CFormSelect style={{ width: '100%' }}
                                aria-label="Default select example"
                                options={[
                                    'Open this select menu',
                                    { label: 'Win', value: 'Win' },
                                    { label: 'Lose', value: 'Lose' },
                                    { label: 'Cancel', value: 'Cancel' }
                                ]}
                                onChange={(e) => handleSelectChange('joinerResult', e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Challenge Status</CFormLabel>
                            <CFormSelect style={{ width: '100%' }}
                                aria-label="Default select example"
                                options={[
                                    'Open this select menu',
                                    { label: 'Clear', value: 'Clear' },
                                    { label: 'Review', value: 'Review' },
                                    { label: 'Cancel', value: 'Cancel' }
                                ]}
                                onChange={(e) => handleSelectChange('challengeStatus', e.target.value)}
                            />
                        </div>
                    </CForm>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleFormSubmit}>
                        Submit
                    </CButton>
                    <CButton color="secondary" onClick={closeModal}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal
                visible={showModal}
                onClick={closeModal}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClick={closeModal}>
                    <CModalTitle id="LiveDemoExampleLabel">{status ? "Creator Image Result" : "Joiner result Image"}</CModalTitle>
                </CModalHeader>
                <CModalBody className="clearfix">

                    <CImage fluid align="center" src={`${baseaddress}/upload/${image}`} alt="Full Image" />
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
            {/* </CContainer> */}
        </>
    )
}

export default ChallengeTable
