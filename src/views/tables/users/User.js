import React, { useState, useMemo, useEffect } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { getAllUsers } from 'src/service/apicalls'
import avatar8 from '../../../assets/images/avatars/8.jpg'
import { CAvatar } from '@coreui/react'
import PropTypes from 'prop-types'
import baseAddress from 'src/service/baseAddress'
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

const User = () => {
  //should be memoized or stable
  const [users, setUsers] = useState([])
  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.data)
    })
  }, [])

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

        size: 50,
        render: (rowData) => (
          <img
            src={rowData.profile} // Assuming 'profile' contains the image path
            alt="Profile"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
        ),
      },
      {
        accessorKey: 'name', //access nested data with dot notation

        header: 'Full Name',

        size: 150,
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
      {
        accessorKey: 'address', //normal accessorKey

        header: '75 sabrampura kalwar road',

        size: 300,
      },

      {
        accessorKey: 'city',

        header: 'City',

        size: 150,
      },

      {
        accessorKey: 'state',

        header: 'State',

        size: 150,
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
  console.log('baseAddress', baseAddress)
  const columns = useMemo(
    () =>
      userTable.map((item) => {
        if (item.header === 'profile') {
          return {
            ...item,
            Cell: ({ row }) => (
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
            ),
          }
        }
        return item
      }),
    [userTable],
  )
  User.propTypes = {
    row: PropTypes.shape({
      original: PropTypes.shape({
        profile: PropTypes.string,
      }),
    }),
  }
  console.log('columns', columns)
  const table = useMaterialReactTable({
    columns,

    data: formattedData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  })

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  )
}

export default User
