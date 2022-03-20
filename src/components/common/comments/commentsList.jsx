/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import Comment from './comment'

const CommentsList = ({ comments, onRemove }) => (
  <>
    {comments.map((comment) => (
      <Comment comment={comment} onRemove={onRemove} key={comment._id} />
    ))}
  </>
)

CommentsList.propTypes = {
  comments: PropTypes
    .arrayOf(PropTypes
      .objectOf(PropTypes
        .oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default CommentsList
