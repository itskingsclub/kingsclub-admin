import React, { createContext, useEffect, useState } from 'react'
import { getuser } from 'src/service/apicalls'
import PropTypes from 'prop-types'

export const UserContext = createContext({
  userDetail: {},
  setUserDetail: (userDetail) => { },
})

export const UserProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState({})
  const [userDetails, setUserDetails] = useState({})
  const value = { userDetail, setUserDetail }

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails')
    const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null
    setUserDetails(userDetails)
  }, [])

  useEffect(() => {
    if (userDetails?.id) {
      getuser(userDetails?.id)
        .then((res) => {
          if (res.success) {
            setUserDetail(res.data)
          } else {
            console.log("error", res)
          }
        })
    }
  }, [userDetails])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Add propTypes validation
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children must be a valid React node
}
