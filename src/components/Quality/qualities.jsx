/* eslint-disable no-underscore-dangle */
import React from 'react'

const Qualities = ({ it }) => (
  it.qualities.map((item) => {
    const classBadgeColor = `badge bg-${item.color} mx-1`
    return (
      <span className={classBadgeColor} key={item._id}>{item.name}</span>
    )
  })
)

export default Qualities
