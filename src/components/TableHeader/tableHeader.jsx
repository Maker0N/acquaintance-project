/* eslint-disable no-unneeded-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import DownUp from '../DownUp/downUp'

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    const localItem = item
    if (selectedSort.path === localItem) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
        downUp: selectedSort.downUp === true ? false : true,
      })
    } else {
      onSort({ path: localItem, order: 'asc', downUp: true })
    }
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={columns[column].path
              ? () => handleSort(columns[column].path)
              : undefined}
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            <>
              {columns[column].name}
              {selectedSort.path === columns[column].path
                  && <DownUp order={selectedSort.order} />}
            </>
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool]))
    .isRequired,
  columns: PropTypes
    .objectOf(PropTypes.objectOf(PropTypes
      .oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool])))
    .isRequired,
}

export default TableHeader
