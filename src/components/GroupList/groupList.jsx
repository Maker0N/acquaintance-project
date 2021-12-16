/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types';

const GroupList = ({
  professions, onItemSelect, selectedItem, handlePageChange,
}) => (
  <ul className="list-group me-2">
    {professions
      ? professions.map((it) => (
        <li
          className={
            professions && selectedItem && it.name === selectedItem.name ? 'list-group-item active' : 'list-group-item'
            }
          key={it._id}
        >
          <div
            role="button"
            tabIndex="0"
            onClick={() => {
              onItemSelect(it)
              handlePageChange(1)
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onItemSelect(it)
              }
            }}
          >
            {it.name}
          </div>
        </li>
      ))
      : null}
  </ul>
)

GroupList.propTypes = {
  professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.objectOf(PropTypes.string).isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

export default GroupList
