import React, { useState, useMemo, useEffect } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { getAllUsers } from 'src/service/apicalls'
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

const Users = () => {
  //should be memoized or stable
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [rowCount, setRowCount] = useState(10)
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([{ desc: true, id: 'game_coin' }])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const fechData = () => {
    const data = {
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination?.pageSize,
      sort: 'id',
      order: sorting[0].desc ? 'ASC' : 'DSC',
    }
    getAllUsers(data).then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
      setRowCount(res?.data?.totalCount)
    })
  }

  useEffect(() => {
    fechData()
  }, [pagination])

  const userTable = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation

        header: 'id',

        size: 50,
      },
      {
        accessorKey: 'profile', //access nested data with dot notation

        header: 'profile',

        size: 30,
      },
      {
        accessorKey: 'name', //access nested data with dot notation

        header: 'Full Name',

        size: 100,
      },
      {
        accessorKey: 'mobile', //access nested data with dot notation

        header: 'mobile number',

        size: 150,
      },

      {
        accessorKey: 'email',

        header: 'Email',

        size: 200,
      },

      {
        accessorKey: 'game_coin', //normal accessorKey

        header: 'game_coin',

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

        header: 'action',

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
        if (item.header === 'profile') {
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
        if (item.header === 'action') {
          return {
            ...item,
            Cell: ({ row }) => (
              <button
                type="button"
                className="btn btn btn-primary"
                onClick={() => navigate(`/user/${row?.original?.id}/profile`)}
              >
                Profile
              </button>
            ),
          }
        }
        return item
      }),
    [userTable],
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

export default Users
