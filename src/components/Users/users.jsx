/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import User from '../User/user'

const Users = ({
  users, handleDelete, handleBookMark,
}) => (
  <table className="table table-striped" hidden={!users.length}>
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col">Избранное</th>
        <th scope="col">Удалить</th>
      </tr>
    </thead>
    <tbody>
      <User
        users={users}
        handleDelete={(userId) => handleDelete(userId)}
        handleBookMark={(userId) => handleBookMark(userId)}
      />
    </tbody>
  </table>
)

export default Users
