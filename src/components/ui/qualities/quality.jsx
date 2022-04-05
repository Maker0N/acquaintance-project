/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ _id, color, name }) => (
  <span className={`badge m-1 bg-${color}`} key={_id}>
    {name}
  </span>
)

Quality.defaultProps = {
  _id: undefined,
}

Quality.propTypes = {
  _id: PropTypes.string,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Quality
