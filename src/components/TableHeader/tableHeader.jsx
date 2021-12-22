import React from 'react'
import PropTypes from 'prop-types'
import DownUp from '../DownUp/downUp'

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    const localItem = item
    if (selectedSort.path === localItem) {
      onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' })
    } else {
      onSort({ path: localItem, order: 'asc' })
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
                && { ...column, downUp: column.downUp }
              : undefined}
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            <>
              {columns[column].name}
              {columns[column].downUp && <DownUp order={selectedSort.order} />}
            </>
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.objectOf(PropTypes.string).isRequired,
  columns: PropTypes
    .objectOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])))
  // PropTypes.shape({
  //   name: PropTypes.objectOf(PropTypes.string),
  //   qualities: PropTypes.objectOf(PropTypes.string),
  //   profession: PropTypes.objectOf(PropTypes.string),
  //   completedMeetings: PropTypes.objectOf(PropTypes.string),
  //   rate: PropTypes.objectOf(PropTypes.string),
  //   bookmark: PropTypes.shape({
  //     path: PropTypes.string,
  //     name: PropTypes.string,
  //     component: PropTypes.func,
  //   }),
  //   delete: PropTypes.objectOf(PropTypes.string),
  // })
    .isRequired,
}

export default TableHeader
