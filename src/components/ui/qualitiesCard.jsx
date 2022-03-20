/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import QualitiesList from './qualities/qualitiesList'

const QualitiesCard = ({ qualities }) => (
  <div className="card mb-3">
    <div className="card-body d-flex flex-column justify-content-center text-center">
      <h5 className="card-title">
        <span>Qualities</span>
      </h5>
      <p className="card-text">
        <QualitiesList qualitiesId={qualities} />
      </p>
    </div>
  </div>
)

QualitiesCard.defaultProps = {
  qualities: undefined,
}

QualitiesCard.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string),
}

export default QualitiesCard
