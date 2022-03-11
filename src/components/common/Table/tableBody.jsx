/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const TableBody = ({
  data, columns, currentPage, usersCrop, handlePageChange,
}) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const { component } = columns[column]
      if (typeof component === 'function') {
        return component(item, currentPage, usersCrop, handlePageChange)
      }
      return component
    }
    if ((columns[column].path) !== undefined
              && (columns[column].path).includes('.')) {
      const pathPath = (columns[column].path).split('.')
      const [path1, path2] = pathPath
      return (
        item[path1][path2]
      )
    }
    return (
      item[columns[column].path]
    )
  }

  return (
    <tbody>
      {data.map((item) => {
        const idUser = `/users/${item._id}`
        return (
          <tr key={item._id}>
            {Object.keys(columns).map((column) => (
              column === 'name'
                ? (
                  <td key={column}>
                    <Link to={idUser}>{renderContent(item, column)}</Link>
                  </td>
                )

                : (
                  <td key={column}>
                    {renderContent(item, column)}
                  </td>
                )
            ))}
          </tr>
        )
      })}
    </tbody>
  )
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    qualities: PropTypes.arrayOf(PropTypes.string),
    completedMeetings: PropTypes.number,
    rate: PropTypes.number,
    bookmark: PropTypes.bool,
  })).isRequired,
  columns: PropTypes.objectOf(PropTypes.objectOf(PropTypes
    .oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool])))
    .isRequired,
  currentPage: PropTypes.number.isRequired,
  usersCrop: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    qualities: PropTypes.arrayOf(PropTypes.string),
    completedMeetings: PropTypes.number,
    rate: PropTypes.number,
    bookmark: PropTypes.bool,
  })).isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

export default TableBody
