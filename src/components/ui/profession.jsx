import React from 'react'
import PropTypes from 'prop-types'
import { useProfessions } from '../../hooks/useProfessions'

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions()
  const prof = getProfession(id)
  if (!isLoading) {
    return <p>{prof.name}</p>
  }
  return <p>Loading...</p>
}

Profession.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Profession
