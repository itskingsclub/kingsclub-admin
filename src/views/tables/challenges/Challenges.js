import React, { useState, useMemo, useEffect } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { getAllUsers, getChallange } from 'src/service/apicalls'
import { CBreadcrumbItem, CHeaderDivider, CContainer, CBreadcrumb, CHeader } from '@coreui/react'
import baseAddress from 'src/service/baseAddress'
import { useNavigate } from 'react-router-dom'

const Payments = () => {
  //should be memoized or stable
  const navigate = useNavigate()
  const [payments, setPayments] = useState([])
  const [rowCount, setRowCount] = useState(10)
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([{ desc: false, id: 'room_code' }])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
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
              <button
                type="button"
                className="btn btn btn-primary"
                onClick={() => navigate(`/challenge/${row?.original?.id}`)}
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
      <button type="button" className="btn btn btn-primary mb-3 text-end" onClick={() => fechData()}>refresh</button>
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
      {/* </CContainer> */}
    </>
  )
}

export default Payments
