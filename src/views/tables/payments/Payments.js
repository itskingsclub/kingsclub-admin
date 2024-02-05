import React, { useState, useMemo, useEffect } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { getAllUsers, getChallange } from 'src/service/apicalls'
import { CAvatar } from '@coreui/react'
import baseAddress from 'src/service/baseAddress'
import { useNavigate } from 'react-router-dom'

const Payments = () => {
  //should be memoized or stable
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
  const fechData = () => {
    const data = {
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination?.pageSize,
      sort: 'id',
      order: sorting[0].desc ? 'ASC' : 'DESC',
    }
    getChallange(data).then((res) => {
      setPayments(res.data.challenges)
      console.log(res.data.challenges)
      setRowCount(res?.data?.totalCount)
    })
  }

  useEffect(() => {
    fechData()
  }, [pagination])

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
        accessorKey: 'joiner_result',

        header: 'joiner_result',

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
      joinerUser: payment.joinerUser?.mobile,
      creator_result: payment.creator_result,
      joiner_result: payment.joiner_result,
      challenge_status: payment.challenge_status,
    }))
  }, [payments])
  const columns = useMemo(
    () =>
      payemntTable.map((item) => {
        if (item.header === 'action') {
          return {
            ...item,
            Cell: ({ row }) => (
              <button
                type="button"
                className="btn btn btn-primary"
                onClick={() => navigate(`/payment/${row?.original?.id}`)}
              >
                Status
              </button>
            ),
          }
        }
        return item
      }),
    [payments],
  )

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={formattedData}
        getRowId={(row) => row.id}
        initialState={{ showColumnFilters: false }}
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

export default Payments
