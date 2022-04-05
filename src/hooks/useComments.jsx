/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import commentService from '../services/comment.service'
import { getCurrentUserId } from '../store/users'

const CommentsContext = React.createContext()

export const useComments = () => useContext(CommentsContext)

export const CommentsProvider = ({ children }) => {
  const currentUserId = useSelector(getCurrentUserId())
  const { userId } = useParams()
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [err, setErr] = useState(null)

  function errorCatcher(error) {
    const { message } = error.response.data
    setErr(message)
  }

  async function removeComment(commentId) {
    try {
      const { content } = await commentService.removeComment(commentId)
      if (content === null) {
        setComments((prev) => prev.filter((c) => c._id !== commentId))
      }
    } catch (error) {
      errorCatcher()
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getComments()
  }, [userId])

  useEffect(() => {
    if (err !== null) {
      toast(err)
      setErr(null)
    }
  }, [err])

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId,
    }
    try {
      const { content } = await commentService.createComment(comment)
      setComments((prev) => [...prev, content])
    } catch (error) {
      errorCatcher(error)
    }
  }

  return (
    <CommentsContext.Provider value={{
      comments, createComment, isLoading, removeComment,
    }}
    >
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
