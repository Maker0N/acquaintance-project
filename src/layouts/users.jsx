import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Login from './login'
import UserPage from '../components/pages/userPage/userPage'
import UsersList from '../components/pages/usersList/usersList'
import UsersLoader from '../components/ui/hoc/usersLoader'
import { getDataStatus } from '../store/users'

const Users = () => {
  const params = useParams()
  const { userId } = params
  const dataStatus = useSelector(getDataStatus())

  if (!dataStatus) {
    return <Login />
  }
  return (
    <>
      <UsersLoader>
        {userId ? <UserPage userId={userId} /> : <UsersList />}
      </UsersLoader>
    </>
  )
}

export default Users
