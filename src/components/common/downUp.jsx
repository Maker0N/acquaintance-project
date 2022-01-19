import React from 'react'
import PropTypes from 'prop-types';

const DownUp = ({ order }) => (
  order === 'asc'
    ? <i className="bi bi-caret-down-fill" />
    : <i className="bi bi-caret-up-fill" />
)

DownUp.propTypes = {
  order: PropTypes.string.isRequired,
}

export default DownUp;
