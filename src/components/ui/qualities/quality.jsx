/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

const Quality = ({ id }) => {
  const { getQuality } = useQualities()

  const { _id, color, name } = getQuality(id)

  return (
    <span className={`badge m-1 bg-${color}`} key={_id}>
      {name}
    </span>
  )
}

Quality.defaultProps = {
  id: undefined,
}

Quality.propTypes = {
  id: PropTypes.string,
}

export default Quality
