/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

const Quality = ({ id }) => {
  const { isLoading, getQuality } = useQualities()

  const userQuality = getQuality(id)

  if (!isLoading) {
    return (
      userQuality.map((item) => {
        const classBadgeColor = `badge bg-${item.color} mx-1`
        return (
          <span className={classBadgeColor} key={item._id}>{item.name}</span>
        )
      })
    )
  }
  return (
    <span>Loading...</span>
  )
}

Quality.propTypes = {
  id: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Quality
