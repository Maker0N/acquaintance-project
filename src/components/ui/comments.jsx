/* eslint-disable no-underscore-dangle */
import React from 'react';
import CommentsList from '../common/comments/commentsList'
import AddCommentForm from '../common/comments/addCommentForm'
import { useComments } from '../../hooks/useComments';

const Comments = () => {
  const { createComment, comments, removeComment } = useComments()

  const handleRemove = (id) => {
    removeComment(id)
  }

  const handleSubmit = (data) => {
    createComment(data)
  }

  if (comments.length !== 0) {
    comments.sort((a, b) => b.created_at - a.created_at)
  }

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body">
          <AddCommentForm
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          <CommentsList comments={comments} onRemove={handleRemove} />
        </div>
      </div>
    </>
  )
}

export default Comments
