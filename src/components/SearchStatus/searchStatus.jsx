/* eslint-disable react/prop-types */
import React from 'react'

const SearchStatus = ({ users, renderPhrase }) => (
  <h3 className={users.length ? 'badge bg-primary' : 'badge bg-danger'}>{renderPhrase(users.length)}</h3>
)

export default SearchStatus
