import React, { useState, useMemo, useEffect, useContext } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CImage, CFormSelect, CForm, CFormLabel, CFormInput, CFormFeedback } from '@coreui/react'
import { deductCoin, getAllUsers } from 'src/service/apicalls'
import { CAvatar } from '@coreui/react'
import baseAddress from 'src/service/baseAddress'
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

const Users = () => {
  //should be memoized or stable
  const navigate = useNavigate()
  const { userDetail } = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [rowCount, setRowCount] = useState(10)
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([{ desc: true, id: 'id' }])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [paymentValues, setPaymentValues] = useState({
    amount: { value: '', error: '' },
    remark: { value: '', error: '' },
  });
  const [userId, setUserId] = useState({})
  const [actionModal, setActionModal] = useState(false);

  const openActionModal = (data) => {
    setActionModal(true);
    console.log("data", data)
    setUserId(data)
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
      user_id: userId,
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

  const fechData = () => {
    const data = {
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination?.pageSize,
      sort: sorting.length > 0 ? sorting[0]?.id : "",
      order: sorting.length > 0 ? sorting[0].desc ? 'ASC' : 'DESC' : 'ASC',
    }
    getAllUsers(data).then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
      console.log("res", res)
      setRowCount(res?.data?.totalCount)
    }).catch((error) => {
      console.log("error", error)
    })
  }

  useEffect(() => {
    fechData()
  }, [pagination, sorting])

  const userTable = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation

        header: 'Id',

        size: 50,
      },
      {
        accessorKey: 'profile', //access nested data with dot notation

        header: 'Profile',

        size: 30,
      },
      {
        accessorKey: 'name', //access nested data with dot notation

        header: 'Full Name',

        size: 100,
      },
      {
        accessorKey: 'mobile', //access nested data with dot notation

        header: 'Mobile number',

        size: 150,
      },

      {
        accessorKey: 'email',

        header: 'Email',

        size: 200,
      },

      {
        accessorKey: 'game_coin', //normal accessorKey

        header: 'Game Coin',

        size: 200,
      },

      // {
      //   accessorKey: 'city',

      //   header: 'City',

      //   size: 150,
      // },

      // {
      //   accessorKey: 'state',

      //   header: 'State',

      //   size: 150,
      // },
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
    return users.map((user) => ({
      id: user.id,
      profile: user.profile,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      game_coin: user.game_coin,
      address: user.address,
      city: user.city,
      state: user.state,
    }))
  }, [users])
  const columns = useMemo(
    () =>
      userTable.map((item) => {
        if (item.header === 'Profile') {
          return {
            ...item,
            Cell: ({ row }) => (
              <>
                {row?.original?.profile !== null ? (
                  <img
                    src={`${baseAddress}/upload/${row?.original?.profile}`}
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
                    {(row?.original?.name).split('')[0].toUpperCase()}
                  </div>
                )}
              </>
            ),
          }
        }
        if (item.header === 'Action') {
          return {
            ...item,
            Cell: ({ row }) => (
              <>
                <button
                  type="button"
                  className="btn btn btn-primary me-3"
                  onClick={() => navigate(`/user/${row?.original?.id}/profile`)}
                >
                  Profile
                </button>
                <button
                  type="button"
                  className="btn btn btn-primary"
                  onClick={() => openActionModal(row?.original?.id)}
                >
                  Withdraw Coin
                </button>
              </>
            ),
          }
        }
        return item
      }),
    [userTable],
  )

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <button type="button" className="btn btn btn-primary" onClick={() => fechData()}>refresh</button>
        <button type="button" className="btn btn btn-primary" onClick={() => navigate(`/adduser`)}>Add User</button>
      </div>
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

export default Users
