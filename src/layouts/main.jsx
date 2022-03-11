import React from 'react'
import useMockData from '../utils/mockData'

const Main = () => {
  const {
    err, initialize, progress, status,
  } = useMockData()
  function handleClick() {
    initialize()
  }

  return (
    <div className="main">
      <h1>Main Page</h1>
      <h3>Инициализация данных в Firebase</h3>
      <ul>
        <li>
          {`Status: ${status}`}
        </li>
        <li>
          {`Progress: ${progress} %`}
        </li>
        {err
        && (
        <li>
          {`Error: ${err}`}
        </li>
        )}
      </ul>
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleClick}
      >
        Инициализировать
      </button>
    </div>
  )
}

export default Main
