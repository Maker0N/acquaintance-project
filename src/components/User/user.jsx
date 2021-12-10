/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types';
import Qualities from '../Quality/qualities'
import BookMark from '../BookMark/bookMark'

const User = ({
  usersCrop,
  handleDelete,
  handleBookMark,
  handlePageChange,
  currentPage,
}) => (
  usersCrop.map((it) => (
    <tr key={it._id}>
      <td className="name">{it.name}</td>
      <td className="qualities">
        <Qualities qualities={it.qualities} />
      </td>
      <td>{it.profession.name}</td>
      <td>{it.completedMeetings}</td>
      <td>{it.rate}</td>
      <td>
        <button
          style={{ border: 'none' }}
          type="button"
          onClick={() => {
            handleBookMark(it._id)
          }}
        >
          <BookMark
            bookmark={it.bookmark}
          />
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            handleDelete(it._id)
            if (currentPage !== 1 && usersCrop.length === 1) {
              handlePageChange((currentPage - 1))
            }
          }}
        >
          Удалить
        </button>
      </td>
    </tr>
  ))
)

User.propTypes = {
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
}

export default User
