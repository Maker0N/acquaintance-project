import React from 'react'
import PropTypes from 'prop-types';

const SearchStatus = ({ itemsCount, renderPhrase }) => (
  <h3 className={itemsCount ? 'badge bg-primary' : 'badge bg-danger'}>{renderPhrase(itemsCount)}</h3>
)

SearchStatus.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  // itemsCount: PropTypes.arrayOf(PropTypes.shape({
  //   _id: PropTypes.string,
  //   name: PropTypes.string,
  //   profession: PropTypes.objectOf(PropTypes.string),
  //   qualities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  //   completedMeetings: PropTypes.number,
  //   rate: PropTypes.number,
  //   bookmark: PropTypes.bool,
  // })).isRequired,
  renderPhrase: PropTypes.func.isRequired,
}

export default SearchStatus
