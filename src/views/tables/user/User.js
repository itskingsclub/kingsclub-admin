import React, { useState, useMemo, useEffect } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useNavigate, useParams } from 'react-router-dom'
import { getuser } from 'src/service/apicalls'
import PropTypes from 'prop-types'
import baseaddress from 'src/service/baseAddress'

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
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const fechData = () => {
    getuser(id).then((res) => {
      setUser(res.data)
    })
  }
  console.log('user', user)
  useEffect(() => {
    fechData()
  }, [])

  const userTable = useMemo(
    () => [
      {
        accessorKey: 'id',

        header: 'Id',

        size: 150,
      },
      {
        accessorKey: 'profile',

        header: 'Profile',

        size: 150,
      },

      {
        accessorKey: 'name',

        header: 'Name',

        size: 150,
      },

      {
        accessorKey: 'mobile', //normal accessorKey

        header: 'Mobile',

        size: 200,
      },
      {
        accessorKey: 'email', //normal accessorKey

        header: 'Email',

        size: 200,
      },

      {
        accessorKey: 'game_coin',

        header: 'Game coin',

        size: 150,
      },
      {
        accessorKey: 'action',

        header: 'Action',

        size: 150,
      },
    ],

    [],
  )
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
                    src={`${baseaddress}/upload/${row?.original?.profile}`}
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
            Cell: () => (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => console.log('click')}
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
  User.propTypes = {
    row: PropTypes.shape({
      original: PropTypes.shape({
        profile: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string,
      }),
    }),
  }

  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <button className="btn btn-primary active" type="button">
          Profile
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate(`/user/${id}/bethistory`)}
        >
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
        data={[user]}
        enableTopToolbar={false}
        enableBottomToolbar={false}
      />
    </>
  )
}

export default User
