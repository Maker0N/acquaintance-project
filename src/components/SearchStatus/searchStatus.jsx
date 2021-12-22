import React from 'react'
import PropTypes from 'prop-types';

const SearchStatus = ({ itemsCount, renderPhrase }) => (
  <h3 className={itemsCount ? 'badge bg-primary' : 'badge bg-danger'}>{renderPhrase(itemsCount)}</h3>
)

SearchStatus.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  renderPhrase: PropTypes.func.isRequired,
}

export default SearchStatus
