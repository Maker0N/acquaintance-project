/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import { useQuality } from '../../hooks/useQualities'

const Quality = ({ id }) => {
  const { isLoading, getQuality } = useQuality()

  const userQuality = getQuality(id)

  if (!isLoading) {
    <span>Loading...</span>
  }
  return (
    userQuality.map((item) => {
      const classBadgeColor = `badge bg-${item.color} mx-1`
      return (
        <span className={classBadgeColor} key={item._id}>{item.name}</span>
      )
    })
  )
}

Quality.propTypes = {
  id: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
}

export default Quality
