/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualityService from '../services/quality.service'

const QualitiesContext = React.createContext()

export const useQualities = () => useContext(QualitiesContext)

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [err, setErr] = useState(null)

  function errorCatcher(error) {
    const { message } = error.response.data
    setErr(message)
  }

  useEffect(() => {
    if (err !== null) {
      toast(err)
      setErr(null)
    }
  }, [err])

  const getQualities = async () => {
    try {
      const { content } = await qualityService.get()
      setQualities(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  useEffect(() => {
    getQualities()
  }, [])

  function getQuality(id) {
    let userQuality = []

    for (let i = 0; i < id.length; i += 1) {
      const qual = qualities
        .reduce((acc, rec) => (rec._id === id[i]
          ? { ...acc, ...rec }
          : acc), [])
      userQuality = [...userQuality, qual]
    }
    return userQuality
  }

  return (
    <QualitiesContext.Provider value={{ isLoading, getQuality, qualities }}>
      {children}
    </QualitiesContext.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
