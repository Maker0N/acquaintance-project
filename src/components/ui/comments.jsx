/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import CommentsList from '../common/comments/commentsList'
import AddCommentForm from '../common/comments/addCommentForm'
import { add, fetchCommentsForUser, remove } from '../../api/fake.api/comments.api'

const Comments = ({
  option, pageId,
}) => {
  const [comments, setComments] = useState([])
  const [commentObj, setCommentObj] = useState({
    _id: '',
    userId: '',
    pageId: '',
    content: '',
  })

  useEffect(() => {
    fetchCommentsForUser(pageId).then((data) => setComments(data))
  }, [])

  const clearNewComment = () => {
    setCommentObj({
      _id: '',
      userId: '',
      pageId: '',
      content: '',
    })
  }

  const handleChangeSelect = (target) => {
    setCommentObj((prev) => ({ ...prev, pageId, userId: target.value }))
  }
  const handleChangeTextArea = (target) => {
    setCommentObj((prev) => ({ ...prev, content: target }))
  }

  const handleRemove = (id) => {
    remove(id).then((commentId) => setComments(comments.filter((x) => x._id !== commentId)))
  }

  const handleSubmit = (objComment) => {
    add(objComment).then((data) => setComments([...comments, data]))
    clearNewComment()
  }

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body">
          <AddCommentForm
            option={option}
            pageId={pageId}
            commentObj={commentObj}
            onSubmit={handleSubmit}
            onChangeSelect={handleChangeSelect}
            onChangeTextArea={handleChangeTextArea}
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

Comments.propTypes = {
  option: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  pageId: PropTypes.string.isRequired,
}

export default Comments
