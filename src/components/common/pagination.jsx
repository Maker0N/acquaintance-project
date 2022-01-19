import React from 'react'
import PropTypes from 'prop-types';

const Pagination = ({
  itemsCount, pageSize, handlePageChange, currentPage,
}) => {
  const pages = Math.ceil(itemsCount / pageSize)
  const pagesArr = Array(pages).fill(0).map((it, index) => index + 1)
  return (
    <nav aria-label="Page navigation example" className="d-flex justify-content-center">
      <ul className="pagination">
        {pagesArr.map((item) => (
          <li
            className={`page-item${item === currentPage ? ' active' : ''}`}
            key={`page${item}`}
          >
            <button
              onClick={() => handlePageChange(item)}
              className="page-link"
              type="button"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
}

export default Pagination
