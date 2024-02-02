import React, { useEffect, useMemo, useState } from 'react'
import { useParams, navigate, useNavigate } from 'react-router-dom'
import { myChallange } from 'src/service/apicalls'
import PropTypes from 'prop-types'
import baseAddress from 'src/service/baseAddress'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'

const Bethistory = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bat, setBat] = useState('')
  const fechData = () => {
    const data = {
      id: id,
    }
    myChallange(data).then((res) => {
      console.log('res', res.data)
      setBat(res.data)
    })
  }
  console.log('bat', bat)
  useEffect(() => {
    fechData()
  }, [])
  const batTable = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation

        header: 'id',

        size: 50,
      },
      {
        accessorKey: 'creator', //access nested data with dot notation

        header: 'Creator',

        size: 30,
      },
      {
        accessorKey: 'creatorUser', //access nested data with dot notation

        header: 'creatorUser',

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
        accessorKey: 'action',

        header: 'action',

        size: 200,
      },
    ],

    [],
  )
  // const formattedData = useMemo(() => {
  //   return bat.map((bat) => ({
  //     id: bat.id,
  //     amount: bat.amount,
  //     // name: bat.name,
  //     // mobile: bat.mobile,
  //     // email: bat.email,
  //     // game_coin: bat.game_coin,
  //     // address: bat.address,
  //     // city: bat.city,
  //     // state: bat.state,
  //   }))
  // }, [bat])
  const columns = useMemo(
    () =>
      batTable.map((item) => {
        if (item.header === 'creatorUser') {
          return {
            ...item,
            Cell: ({ row }) => console.log(row?.original?.creatorUser?.mobile),
          }
        }
        if (item.header === 'action') {
          return {
            ...item,
            Cell: () => (
              <button
                type="button"
                className="btn btn btn-primary"
                onClick={() => console.log('object')}
              >
                Profile
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
        data={bat}
        getRowId={(row) => row.id}
        manualFiltering
        manualPagination
        enableStickyHeader
        enableStickyFooter
        muiSearchTextFieldProps={{
          placeholder: `Search Number`,
        }}
      />
    </>
  )
}

export default Bethistory
