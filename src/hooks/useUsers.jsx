import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import userService from '../services/user.service'

const UserContext = React.createContext()

export const useUser = () => useContext(UserContext)

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [err, setErr] = useState(null)

  // console.log(users)

  function errorCatcher(error) {
    const { message } = error.response.data
    setErr(message)
  }

  async function getUsers() {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (err !== null) {
      toast(err)
      setErr(null)
    }
  }, [err])

  return (
    <UserContext.Provider value={{ users }}>
      {!isLoading ? children : <h1>Loading...</h1>}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default UserProvider
