/* eslint-disable import/no-cycle */
import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import userService from '../services/user.service'
import { setTokens, getAccessToken, removeAuthData } from '../services/localStorage.service'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
})
const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [err, setErr] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  function errorCatcher(error) {
    const { message } = error.response.data.error
    setErr(message)
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser()
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (getAccessToken()) {
      getUserData()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (err !== null) {
      toast(err)
      setErr(null)
    }
  }, [err])

  async function createUser(data) {
    try {
      const { content } = await userService.create(data)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function logOut() {
    removeAuthData()
    setCurrentUser(null)
    history.push('/')
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post('accounts:signUp', {
        email,
        password,
        returnSecureToken: true,
      })
      setTokens(data)
      await createUser({
        _id: data.localId,
        email,
        completedMeetings: randomInt(0, 200),
        rate: randomInt(0, 5),
        image: `https://avatars.dicebear.com/api/avataaars/${(
          Math.random() + 1
        )
          .toString(36)
          .substring(7)}.svg`,
        ...rest,
      })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким Email уже существует!',
          }
          throw errorObject
        }
      }
    }
  }

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true,
      })
      setTokens(data)
      await getUserData()
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND' || message === 'INVALID_PASSWORD') {
          const errorObject = {
            email: 'Пользователя с таким Email или паролем не существует!',
          }
          throw errorObject
        }
      }
    }
  }

  async function update(data) {
    try {
      const { content } = await userService.create(data)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  return (
    <AuthContext.Provider value={{
      signUp, currentUser, signIn, logOut, update,
    }}
    >
      { !isLoading ? children : 'LOADING...' }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default AuthProvider
