import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { getProfessionsByIds, getProfessionsLoadingStatus } from '../../store/professions'

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus())
  const prof = useSelector(getProfessionsByIds(id))
  if (isLoading) {
    return <p>Loading...</p>
  }
  return <p>{prof.name}</p>
}

Profession.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Profession
