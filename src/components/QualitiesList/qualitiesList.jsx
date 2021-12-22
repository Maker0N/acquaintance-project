import React from 'react'
import PropTypes from 'prop-types'
import Qualities from '../Quality/qualities'

const QualitiesList = ({ qualities }) => <Qualities qualities={qualities} />

QualitiesList.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default QualitiesList
