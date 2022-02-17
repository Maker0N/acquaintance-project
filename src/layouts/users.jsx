import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/pages/userPage/userPage'
import UsersList from '../components/pages/usersList/usersList'
import UserProvider from '../hooks/useUsers'

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return (
    <>
      <UserProvider>
        {userId ? <UserPage userId={userId} /> : <UsersList />}
      </UserProvider>
    </>
  )
}

export default Users
