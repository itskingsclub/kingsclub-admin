import React, { useEffect, useMemo, useState } from 'react'
import { useParams, navigate, useNavigate } from 'react-router-dom'
import { myChallange, myPayment } from 'src/service/apicalls'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'

const Backstatement = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mypayment, setMypayment] = useState([])
  const [rowCount, setRowCount] = useState(10)
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([{ desc: false, id: 'updatedAt' }])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const fechData = () => {
    const data = {
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination?.pageSize,
      sort: sorting.length > 0 ? sorting[0]?.id : "updatedAt",
      order: sorting.length > 0 ? sorting[0].desc ? 'DESC' : 'ASC' : 'DESC',
      id: id,
    }
    myPayment(data).then((res) => {
      setMypayment(res.data.payments)
      console.log("res", res.data.payments)
      setRowCount(res?.data?.totalCount)
    })
  }
  useEffect(() => {
    fechData()
  }, [pagination, sorting])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const paymentTable = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation

        header: 'id',

        size: 50,
      },
      {
        accessorKey: 'amount', //access nested data with dot notation

        header: 'amount',

        size: 30,
      },
      {
        accessorKey: 'payment_id', //access nested data with dot notation

        header: 'payment_id',

        size: 30,
      },
      {
        accessorKey: 'updatedAt', //access nested data with dot notation

        header: 'updatedAt',

        size: 30,
      },
      {
        accessorKey: 'payment_mode', //access nested data with dot notation

        header: 'payment_mode',

        size: 30,
      },
      {
        accessorKey: 'type', //access nested data with dot notation

        header: 'type',

        size: 30,
      },
      {
        accessorKey: 'payment_status', //access nested data with dot notation

        header: 'payment_status',

        size: 100,
      },
      {
        accessorKey: 'action',

        header: 'action',

        size: 200,
      },
    ],

    [],
  )
  const formattedData = useMemo(() => {
    return mypayment.map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      updatedAt: formatDate(payment.updatedAt),
      payment_id: payment.payment_id,
      payment_mode: payment.payment_mode,
      payment_status: payment.payment_status,
      type: payment.type,
    }))
  }, [mypayment])
  const columns = useMemo(
    () =>
      paymentTable.map((item) => {
        if (item.header === 'action') {
          return {
            ...item,
            Cell: () => (
              <button
                type="button"
                className="btn btn btn-primary"
                onClick={() => console.log('object')}
              >
                Action
              </button>
            ),
          }
        }
        return item
      }),
    [],
  )
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate(`/user/${id}/profile`)}
        >
          Profile
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate(`/user/${id}/bethistory`)}
        >
          Bet Histroy
        </button>
        <button className="btn btn-primary active" type="button">
          Account Statement
        </button>
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
          placeholder: `Search Bat Id`,
        }}
      />
    </>
  )
}

export default Backstatement
