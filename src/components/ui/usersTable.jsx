/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from '../common/Table/tableHeader'
import TableBody from '../common/Table/tableBody'
// import QualitiesList from './qualities/qualitiesList'
import BookMark from '../common/bookMark'
import Profession from './profession'
import QualitiesList from './qualities/qualitiesList'

const UsersTable = ({
  users,
  usersCrop,
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
          <QualitiesList qualitiesId={qualities} />
        )
      },
    },
    profession: {
      name: 'Профессия',
      component(user) {
        const { profession } = user
        return <Profession id={profession} />
      },
    },
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
  }

  return (
    <table className="table table-striped" hidden={!users.length}>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{
        columns,
        data: usersCrop,
        usersCrop,
        handleBookMark,
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
    profession: PropTypes.string,
    qualities: PropTypes.arrayOf(PropTypes.string),
    completedMeetings: PropTypes.number,
    rate: PropTypes.number,
    bookmark: PropTypes.bool,
  })).isRequired,
  usersCrop: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    qualities: PropTypes.arrayOf(PropTypes.string),
    completedMeetings: PropTypes.number,
    rate: PropTypes.number,
    bookmark: PropTypes.bool,
  })).isRequired,
  handleBookMark: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool]))
    .isRequired,
}

export default UsersTable
