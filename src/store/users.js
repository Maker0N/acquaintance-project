/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import {
  setTokens, getAccessToken, getUserId, removeAuthData,
} from '../services/localStorage.service'
import userService from '../services/user.service'
import getRandomInt from '../utils/getRandomInt'
import history from '../utils/histoty'
import generateAuthError from '../utils/generateAuthError'

const initialState = getAccessToken()
  ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: getUserId() },
    isLoggedIn: true,
    dataLoaded: false,
  }
  : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false,
  }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
      state.dataLoaded = true
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.isLoggedIn = true
      state.auth = action.payload
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(action.payload)
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[state.entities.findIndex((u) => u._id === action.payload._id)] = action.payload
    },
    authRequested: (state) => {
      state.error = null
    },
  },
})

const { reducer: usersReducer, actions } = usersSlice
const {
  usersRequested,
  usersReceved,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdateSuccessed,
} = actions
const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('user/userCreateRequested')
const createUserFailed = createAction('user/createUserFailed')
const userUpdateFailed = createAction('user/userUpdateFailed')
const userUpdateRequested = createAction('user/userUpdateRequested')

export const login = ({ payload, redirect }) => async (dispatch) => {
  const { email, password } = payload
  dispatch(authRequested())
  try {
    const data = await authService.login({ email, password })
    dispatch(authRequestSuccess({ userId: data.localId }))
    setTokens(data)
    history.push(redirect)
  } catch (error) {
    const { code, message } = error.response.data.error
    if (code === 400) {
      const errorMessage = generateAuthError(message)
      dispatch(authRequestFailed(errorMessage))
    } else {
      dispatch(authRequestFailed(error.message))
    }
  }
}

export const logOut = () => (dispatch) => {
  removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested())
  try {
    const { content } = await userService.create(payload)
    dispatch(userCreated(content))
    history.push('/')
  } catch (error) {
    dispatch(createUserFailed(error.message))
  }
}

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.register({ email, password })
    setTokens(data)
    dispatch(authRequestSuccess({ userId: data.localId }))
    dispatch(createUser({
      _id: data.localId,
      email,
      completedMeetings: getRandomInt(0, 200),
      rate: getRandomInt(0, 5),
      image: `https://avatars.dicebear.com/api/avataaars/${(
        Math.random() + 1
      )
        .toString(36)
        .substring(7)}.svg`,
      ...rest,
    }))
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersReceved(content))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const { content } = await userService.update(payload)
    dispatch(userUpdateSuccessed(content))
    history.push(`/users/${content._id}`)
  } catch (error) {
    dispatch(userUpdateFailed(error.message))
  }
}

export const getUsers = () => (state) => state.users.entities

export const getCurrentUserData = () => (state) => (state.users.entities
  ? state.users.entities.find((u) => u._id === state.users.auth.userId)
  : null)

export const getUserById = (userId) => (state) => state.users.entities
  .find((user) => user._id === userId)

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn

export const getDataStatus = () => (state) => state.users.dataLoaded

export const getUsersLoadingStatus = () => (state) => state.users.isLoading

export const getCurrentUserId = () => (state) => state.users.auth.userId

export const getAuthErrors = () => (state) => state.users.error

export default usersReducer
