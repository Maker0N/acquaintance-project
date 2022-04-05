/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import displayDate from '../../../utils/displayDate'
import { getCurrentUserId, getUserById } from '../../../store/users'

const Comment = ({ onRemove, comment }) => {
  const currentUserId = useSelector(getCurrentUserId())
  const user = useSelector(getUserById(comment.userId))

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user && user.name}
                    {' '}
                    <span className="small">
                      -
                      {' '}
                      {displayDate(comment.created_at)}
                    </span>
                  </p>
                  {currentUserId === user._id
                  && (
                  <button
                    type="button"
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={() => onRemove(comment._id)}
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                  )}
                </div>
                <p className="small mb-0">{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  onRemove: PropTypes.func.isRequired,
  comment: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
}

export default Comment
