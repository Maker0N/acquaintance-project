/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types';
import User from '../User/user'

const Users = ({
  users, usersCrop, handleDelete, handleBookMark, handlePageChange, currentPage,
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
        usersCrop={usersCrop}
        handleDelete={(userId) => handleDelete(userId)}
        handleBookMark={(userId) => handleBookMark(userId)}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </tbody>
  </table>
)

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.objectOf(PropTypes.string),
    qualities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    completedMeetings: PropTypes.number,
    rate: PropTypes.number,
    bookmark: PropTypes.bool,
  })).isRequired,
  usersCrop: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.objectOf(PropTypes.string),
    qualities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    completedMeetings: PropTypes.number,
    rate: PropTypes.number,
    bookmark: PropTypes.bool,
  })).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleBookMark: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
}

export default Users
