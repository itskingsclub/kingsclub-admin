import React, { useState, useMemo, useEffect, useContext } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { getAllUsers, getDeposit, getPayments, updateDeposit } from 'src/service/apicalls'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CImage, CFormSelect, CForm, CFormLabel, CFormInput, CFormFeedback } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import baseaddress from 'src/service/baseAddress'
import { UserContext } from 'src/userDetail/Userdetail'
const data = [
  {
    id: '2',
    profile: '2',
    name: 'mukesh jat',
    mobile: 1234567890,
    email: 'muukesh@gmail.com',
    game_coin: 12312,
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
]

const Deposits = () => {
  //should be memoized or stable
  const { userDetail } = useContext(UserContext)
  const navigate = useNavigate()
  const [payments, setPayments] = useState([])
  const [rowCount, setRowCount] = useState(10)
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([{ desc: true, id: 'updatedAt' }])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const [paymentValues, setPaymentValues] = useState({
    amount: { value: '', error: '' },
    remark: { value: '', error: '' },
    payment_status: { value: '', error: '' },
  });
  const [challengedata, setChallengedata] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [image, setImage] = useState(false)

  const openModal = (image) => {
    setImage(image)
    setShowModal(true);
  };
  const openActionModal = (data) => {
    setActionModal(true);
    console.log("challengetData", data)
    setChallengedata(data)
  };

  const closeModal = () => {
    setShowModal(false);
    setActionModal(false);
  };
  const handleInputChange = (fieldName, value) => {
    const regexPattern = {
      amount: /^\d+$/,
      remark: /^(?:\s*\b\w+\b\s*){0,50}$/,
      payment_status: /^(?!Select\s.*$).+$/,
    }
    let isvalid = true;
    let error = "";

    if (fieldName === "payment_status") {
      isvalid = value != '3'; // Check if role is selected
      error = isvalid ? "" : "Please select a status";
    } else {
      isvalid = regexPattern[fieldName].test(value);
      error = isvalid ? "" : `Invalid ${fieldName}`;
    }
    setPaymentValues((prevValues) => ({
      ...prevValues,
      [fieldName]: { value, error },
    }));
  };
  const handleFormSubmit = () => {

    const data = {
      admin_id: userDetail.id,
      id: challengedata.id,
      user_id: challengedata.userId,
      amount: Number(paymentValues.amount.value),
      payment_status: paymentValues.payment_status.value,
      remark: paymentValues.remark.value,
      updated_by: userDetail.id,
    }
    console.log("data", data)
    updateDeposit(data).then((res) => {
      console.log("res.data", res.data)
      closeModal()
      fechData()
    })
  };

  const fechData = () => {
    const data = {
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination?.pageSize,
      sort: sorting.length > 0 ? sorting[0]?.id : "updatedAt",
      order: sorting[0].desc ? 'DESC' : 'ASC',
    }
    getDeposit(data).then((res) => {
      setPayments(res.data.payments)
      console.log("res", res.data)
      setRowCount(res?.data?.totalCount)
    })
  }

  useEffect(() => {
    fechData()
  }, [pagination])

  const paymentTable = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation

        header: 'Id',

        size: 50,
      },
      {
        accessorKey: 'user_mobile', //access nested data with dot notation

        header: 'User',

        size: 30,
      },
      {
        accessorKey: 'amount', //access nested data with dot notation

        header: 'Amount',

        size: 100,
      },
      {
        accessorKey: 'payment_mode', //access nested data with dot notation

        header: 'Payment Mode',

        size: 150,
      },
      {
        accessorKey: 'updatedAt', //access nested data with dot notation

        header: 'Updated At',

        size: 150,
      },
      {
        accessorKey: 'image', //access nested data with dot notation

        header: 'Image',

        size: 150,
      },

      {
        accessorKey: 'payment_status',

        header: 'Payment Status',

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
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Map the users data to match the expected format
  const formattedData = useMemo(() => {
    return payments.filter(payment => payment.type === "Deposit").map((payment) => ({
      id: payment.id,
      type: payment.type,
      user_mobile: payment.user?.mobile,
      userId: payment.user?.id,
      amount: payment.amount,
      payment_mode: payment.payment_mode,
      updatedAt: formatDate(payment.updatedAt),
      image: payment.image,
      payment_status: payment.payment_status,
    }))
  }, [payments])
  const columns = useMemo(
    () =>
      paymentTable.map((item) => {
        if (item.header === 'Image') {
          return {
            ...item,
            Cell: ({ row }) => (
              <>
                {row?.original?.image !== undefined ? (
                  <img
                    src={`${baseaddress}/upload/${row?.original?.image}`}
                    alt="No Image"
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                    onClick={() => openModal(row?.original?.image)}
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
                <button
                  type="button"
                  className="btn btn btn-primary me-3"
                  onClick={() => openActionModal(row?.original)}
                >
                  Action
                </button>
                <button
                  type="button"
                  className="btn btn btn-primary"
                  onClick={() => navigate(`/deposit/${row?.original?.id}`)}
                >
                  View
                </button>
              </>
            ),
          }
        }
        if (item.accessorKey === 'user_mobile') {
          return {
            ...item,
            Cell: ({ row }) => (
              <a className='link'
                onClick={() => navigate(`/user/${row?.original?.userId}/profile`)}
              >
                {row?.original?.user_mobile}
              </a>
            ),
          }
        }
        return item
      }),
    [paymentTable],
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
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Payment Status</CFormLabel>
              <CFormSelect style={{ width: '100%' }}
                aria-label="Default select example"
                options={[
                  { label: 'Open this select menu', value: '3' },
                  { label: 'Sucessfull', value: 'Sucessfull' },
                  { label: 'Fraud', value: 'Fraud' },
                  { label: 'Cancel', value: 'Cancel' }
                ]}
                onChange={(e) => handleInputChange('payment_status', e.target.value)}
              />
              <CFormFeedback className='text-danger'>{paymentValues.payment_status.error}</CFormFeedback>
            </div>
          </CForm>

        </CModalBody>
        <CModalFooter>
          <CButton className='btn btn btn-primary' disabled={paymentValues.amount.value == "" || paymentValues.amount.error != "" || paymentValues.payment_status.value == '' || paymentValues.payment_status.error != ""} onClick={handleFormSubmit}>
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
          <CModalTitle id="LiveDemoExampleLabel">Payment Screenshot</CModalTitle>
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
    </>
  )
}

export default Deposits
