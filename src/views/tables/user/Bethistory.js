import React, { useEffect, useMemo, useState } from 'react'
import { useParams, navigate, useNavigate } from 'react-router-dom'
import { myChallange } from 'src/service/apicalls'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'

const Bethistory = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bat, setBat] = useState([])
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
      id: id,
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination?.pageSize,
      sort: sorting.length > 0 ? sorting[0]?.id : "challenge_status",
      order: sorting.length > 0 ? sorting[0].desc ? 'ASC' : 'DESC' : 'ASC',
    }
    myChallange(data).then((res) => {
      setBat(res.data.challenges)
      console.log("res", res.data.challenges)
      setRowCount(res?.data?.totalCount)
    })
  }
  useEffect(() => {
    fechData()
  }, [pagination, sorting])
  const batTable = useMemo(
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

        size: 30,
      },
      {
        accessorKey: 'amount', //access nested data with dot notation

        header: 'amount',

        size: 30,
      },
      {
        accessorKey: 'challenge_status', //access nested data with dot notation

        header: 'challenge_status',

        size: 100,
      },
      {
        accessorKey: 'challenge_result', //access nested data with dot notation

        header: 'challenge_result',

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
    return bat.map((bat) => ({
      id: bat.id,
      creatorUser: bat.creatorUser?.mobile,
      joinerUser: bat.joinerUser?.mobile,
      amount: bat.amount,
      challenge_status: bat.challenge_status,
      challenge_result: id == bat.creator ? bat.creator_result : bat.joiner_result
    }))
  }, [bat])
  const columns = useMemo(
    () =>
      batTable.map((item) => {
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
        <button className="btn btn-primary active" type="button">
          Bet Histroy
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate(`/user/${id}/bankstatement`)}
        >
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

export default Bethistory
