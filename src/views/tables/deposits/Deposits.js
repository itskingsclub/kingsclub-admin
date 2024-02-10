import React, { useState, useMemo, useEffect } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { getAllUsers, getPayments } from 'src/service/apicalls'
import { CAvatar } from '@coreui/react'
import baseAddress from 'src/service/baseAddress'
import { useNavigate } from 'react-router-dom'
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
  const fechData = () => {
    const data = {
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination?.pageSize,
      sort: sorting.length > 0 ? sorting[0]?.id : "updatedAt",
      order: sorting[0].desc ? 'ASC' : 'DSC',
    }
    getPayments(data).then((res) => {
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

        header: 'id',

        size: 50,
      },
      {
        accessorKey: 'user_id', //access nested data with dot notation

        header: 'user_id',

        size: 30,
      },
      {
        accessorKey: 'amount', //access nested data with dot notation

        header: 'amount',

        size: 100,
      },
      {
        accessorKey: 'payment_mode', //access nested data with dot notation

        header: 'payment_mode',

        size: 150,
      },
      {
        accessorKey: 'updatedAt', //access nested data with dot notation

        header: 'updatedAt',

        size: 150,
      },

      {
        accessorKey: 'payment_status',

        header: 'payment_status',

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
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Map the users data to match the expected format
  const formattedData = useMemo(() => {
    return payments.filter(payment => payment.type === "Deposit").map((payment) => ({
      id: payment.id,
      type: payment.type,
      user_id: payment.user_id,
      amount: payment.amount,
      payment_mode: payment.payment_mode,
      updatedAt: formatDate(payment.updatedAt),
      payment_status: payment.payment_status,
    }))
  }, [payments])
  const columns = useMemo(
    () =>
      paymentTable.map((item) => {
        if (item.header === 'action') {
          return {
            ...item,
            Cell: ({ row }) => (
              <button
                type="button"
                className="btn btn btn-primary"
                onClick={() => navigate(`/deposit/${row?.original?.id}`)}
              >
                Action
              </button>
            ),
          }
        }
        return item
      }),
    [paymentTable],
  )

  return (
    <>
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
    </>
  )
}

export default Deposits
