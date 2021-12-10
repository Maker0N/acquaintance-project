import React from 'react'
import PropTypes from 'prop-types';

const SearchStatus = ({ users, renderPhrase }) => (
  <h3 className={users.length ? 'badge bg-primary' : 'badge bg-danger'}>{renderPhrase(users.length)}</h3>
)

SearchStatus.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.objectOf(PropTypes.string),
    qualities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    completedMeetings: PropTypes.number,
    rate: PropTypes.number,
    bookmark: PropTypes.bool,
  })).isRequired,
  renderPhrase: PropTypes.func.isRequired,
}

export default SearchStatus
