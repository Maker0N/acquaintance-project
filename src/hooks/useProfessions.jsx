/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import ProfessionService from '../services/profession.service'

const ProfessionContext = React.createContext()

export const useProfessions = () => useContext(ProfessionContext)

const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([])
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

  async function getProfessionsList() {
    try {
      const { content } = await ProfessionService.get()
      setProfessions(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  useEffect(() => {
    getProfessionsList()
  }, [])

  function getProfession(id) {
    return professions.find((prof) => prof._id === id)
  }

  return (
    <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default ProfessionProvider
