import React, { useState, useMemo, useEffect, useContext } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { getAllUsers, getPayments, getWithdraw, updateWithdraw } from 'src/service/apicalls'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CImage, CFormSelect, CForm, CFormLabel, CFormInput, CFormFeedback } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
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

const Withdraws = () => {
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
  const [actionModal, setActionModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [formdata, setFormdata] = useState({})



  const openActionModal = (data) => {
    setActionModal(true);
    setChallengedata(data)
  };
  const openFormModal = (data) => {
    setFormModal(true);
    console.log("data", data)
    setFormdata(data)
  };

  const closeModal = () => {
    setActionModal(false);
    setFormModal(false);
  };
  const handleInputChange = (fieldName, value) => {
    const regexPattern = {
      amount: /^\d+(\.\d+)?$/,
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
      amount: paymentValues.amount.value,
      payment_status: paymentValues.payment_status.value,
      remark: paymentValues.remark.value,
      updated_by: userDetail.id,
    }
    updateWithdraw(data).then((res) => {
      console.log("res.data", res?.message)
      closeModal()
      fechData()
    })
  };

  const fechData = () => {
    const data = {
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination?.pageSize,
      sort: sorting.length > 0 ? sorting[0]?.id : "updatedAt",
      order: sorting[0].desc ? 'ASC' : 'DSC',
    }
    getWithdraw(data).then((res) => {
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
      // {
      //   accessorKey: 'upi_id', //access nested data with dot notation

      //   header: 'Upi Id',

      //   size: 100,
      // },
      // {
      //   accessorKey: 'account_number', //access nested data with dot notation

      //   header: 'Acount Number',

      //   size: 100,
      // },
      // {
      //   accessorKey: 'ifsc_code', //access nested data with dot notation

      //   header: 'IFSC Code',

      //   size: 100,
      // },
      // {
      //   accessorKey: 'bank_name', //access nested data with dot notation

      //   header: 'Bank Name',

      //   size: 100,
      // },
      // {
      //   accessorKey: 'account_holder_name', //access nested data with dot notation

      //   header: 'Account Holder Name',

      //   size: 100,
      // },
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
    return payments.filter(payment => payment.type === "Withdraw").map((payment) => ({
      id: payment.id,
      type: payment.type,
      user_mobile: payment.user?.mobile,
      upi_id: payment.user?.upi_id,
      account_number: payment.user?.account_number,
      ifsc_code: payment.user?.ifsc_code,
      bank_name: payment.user?.bank_name,
      account_holder_name: payment.user?.account_holder_name,
      userId: payment.user?.id,
      amount: payment.amount,
      payment_mode: payment.payment_mode,
      updatedAt: formatDate(payment.updatedAt),
      payment_status: payment.payment_status,
    }))
  }, [payments])
  const columns = useMemo(
    () =>
      paymentTable.map((item) => {
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
                  onClick={() => openFormModal(row?.original)}
                >
                  Form
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
                placeholder="Enter Your Full name"
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
                placeholder="Enter Your Full name"
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
        visible={formModal}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClick={closeModal}>
          <CModalTitle id="LiveDemoExampleLabel">Form Details</CModalTitle>
        </CModalHeader>
        <CModalBody className="clearfix p-0">
          <div className="user-info">
            <div className="user-info-left">
              <div className="info-item">
                <span className="info-label">Upi Id</span>
                <span className="info-value">{formdata.upi_id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Number:</span>
                <span className="info-value">{formdata.account_number}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Bank Name:</span>
                <span className="info-value">{formdata.bank_name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">IFSC Code:</span>
                <span className="info-value">{formdata.ifsc_code}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Holder Name:</span>
                <span className="info-value">{formdata.account_holder_name}</span>
              </div>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Withdraws
