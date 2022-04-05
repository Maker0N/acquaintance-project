/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { orderBy } from 'lodash'
import CommentsList from '../common/comments/commentsList'
import AddCommentForm from '../common/comments/addCommentForm'
import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
  createComment,
} from '../../store/comments'

const Comments = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())

  const handleRemove = (id) => {
    dispatch(removeComment(id))
  }

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: userId }))
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

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
          {!isLoading
            ? <CommentsList comments={sortedComments} onRemove={handleRemove} />
            : 'Loading...'}
        </div>
      </div>
    </>
  )
}

export default Comments
