/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'

const QualitiesCard = ({ qualities }) => (
  <div className="card mb-3">
    <div className="card-body d-flex flex-column justify-content-center text-center">
      <h5 className="card-title">
        <span>Qualities</span>
      </h5>
      <div className="card-text">
        {qualities.map((it) => {
          const classBadgeColor = `card-text badge bg-${it.color} mx-1`
          return (
            <p className={classBadgeColor} key={it._id}>{it.name}</p>)
        })}
      </div>
    </div>
  </div>
)

QualitiesCard.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
}

export default QualitiesCard
