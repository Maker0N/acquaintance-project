/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types';

const Qualities = ({ qualities }) => (
  qualities.map((item) => {
    const classBadgeColor = `badge bg-${item.color} mx-1`
    return (
      <span className={classBadgeColor} key={item._id}>{item.name}</span>
    )
  })
)

Qualities.propTypes = {
  it: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
}

export default Qualities
