import React, { useState, useMemo, useEffect, useContext } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { clearChallenge, getAllUsers, getChallange } from 'src/service/apicalls'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CImage, CFormSelect, CForm, CFormLabel, CFormInput } from '@coreui/react'
import baseAddress from 'src/service/baseAddress'
import { useNavigate } from 'react-router-dom'
import baseaddress from 'src/service/baseAddress'
import { UserContext } from 'src/userDetail/Userdetail'

const Payments = () => {
  //should be memoized or stable
  const { userDetail } = useContext(UserContext)
  const navigate = useNavigate()
  const [payments, setPayments] = useState([])
  const [rowCount, setRowCount] = useState(10)
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([{ desc: false, id: 'challenge_status' }])
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
  const fechData = () => {
    const data = {
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination?.pageSize,
      sort: sorting.length > 0 ? sorting[0]?.id : "id",
      order: sorting.length > 0 ? sorting[0].desc ? 'ASC' : 'DESC' : 'ASC',
    }
    console.log("data", data)
    getChallange(data).then((res) => {
      setPayments(res.data.challenges)
      setRowCount(res?.data?.totalCount)
    })
  }

  useEffect(() => {
    fechData()
  }, [pagination, sorting])

  const payemntTable = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation

        header: 'id',

        size: 50,
      },
      {
        accessorKey: 'creatorUser', //access nested data with dot notation

        header: 'creatorUser',

        size: 30,
      },
      {
        accessorKey: 'joinerUser', //access nested data with dot notation

        header: 'joinerUser',

        size: 100,
      },

      {
        accessorKey: 'creator_result',

        header: 'creator_result',

        size: 200,
      },
      {
        accessorKey: 'creator_result_image',

        header: 'creator_result_image',

        size: 200,
      },
      {
        accessorKey: 'joiner_result',

        header: 'joiner_result',

        size: 200,
      },
      {
        accessorKey: 'joiner_result_image',

        header: 'joiner_result_image',

        size: 200,
      },
      {
        accessorKey: 'challenge_status',

        header: 'challenge_status',

        size: 200,
      },
      {
        accessorKey: 'action',

        header: 'action',

        size: 200,
      },
    ],

    [],
  )
  // console.log('column', columns)

  // Map the users data to match the expected format
  const formattedData = useMemo(() => {
    return payments.map((payment) => ({
      id: payment.id,
      creatorUser: payment.creatorUser?.mobile,
      creator_result_image: payment.creator_result_image,
      joinerUser: payment.joinerUser?.mobile,
      joiner_result_image: payment.joiner_result_image,
      creator_result: payment.creator_result,
      joiner_result: payment.joiner_result,
      challenge_status: payment.challenge_status,
    }))
  }, [payments])

  const columns = useMemo(
    () =>
      payemntTable.map((item) => {
        if (item.header === 'creator_result_image' || item.header === 'joiner_result_image') {
          return {
            ...item,
            Cell: ({ row }) => (
              <>
                {row?.original[item.header] !== undefined ? (
                  <img
                    src={`${baseAddress}/upload/${row?.original[item.header]}`}
                    alt="No Image"
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                    onClick={() => openModal(row?.original[item.header], item.header)}
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
        if (item.header === 'action') {
          return {
            ...item,
            Cell: ({ row }) => (
              <>
                <button
                  type="button"
                  className="btn btn btn-primary me-2"
                  onClick={() => openActionModal(row?.original)}
                >
                  Action
                </button>
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
        return item
      }),
    [payments],
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
              <CFormLabel htmlFor="exampleFormControlInput1">Joiner result</CFormLabel>
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

export default Payments
