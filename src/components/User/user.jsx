/* eslint-disable no-underscore-dangle */
import React from 'react'
import Qualities from '../Quality/qualities'
import BookMark from '../BookMark/bookMark'

const User = ({
  users,
  handleDelete,
  handleBookMark,
}) => (
  users.map((it) => (
    <tr key={it._id}>
      <td>{it.name}</td>
      <td>
        <Qualities it={it} />
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
            it={it}
          />
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            handleDelete(it._id)
          }}
        >
          Удалить
        </button>
      </td>
    </tr>
  ))
)

export default User
