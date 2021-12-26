/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
// import User from '../User/user'
import TableHeader from '../TableHeader/tableHeader'
import TableBody from '../TableBody/tableBody'
import QualitiesList from '../QualitiesList/qualitiesList'
import BookMark from '../BookMark/bookMark'

const UsersTable = ({
  users,
  usersCrop,
  handleDelete,
  handleBookMark,
  handlePageChange,
  currentPage,
  onSort,
  selectedSort,
}) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component(user) {
        const { qualities } = user
        return (
          <QualitiesList qualities={qualities} />
        )
      },
    },
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component(user) {
        const { bookmark } = user
        return (
          <button
            style={{ border: 'none' }}
            type="button"
            onClick={() => {
              handleBookMark(user._id)
            }}
          >
            <BookMark
              bookmark={bookmark}
            />
          </button>
        )
      },
    },
    delete: {
      name: 'Удалить',
      component(user, current, crop, pageChange) {
        return (
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              handleDelete(user._id)
              if (current !== 1 && crop.length === 1) {
                pageChange((current - 1))
              }
            }}
          >
            Удалить
          </button>
        )
      },
    },
  }

  return (
    <table className="table table-striped" hidden={!users.length}>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{
        columns,
        data: usersCrop,
        usersCrop,
        handleBookMark,
        handleDelete,
        handlePageChange,
        currentPage,
      }}
      />
    </table>
  )
}

UsersTable.propTypes = {
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
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool]))
    .isRequired,
}

export default UsersTable
