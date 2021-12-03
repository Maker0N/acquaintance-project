/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import api from '../../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    setUsers(users.filter((it) => it._id !== userId))
  }
  const renderPhrase = (number) => {
    let phrase
    if (String(number).length === 2 && Number(String(number)[0]) === 1) {
      phrase = `${number} человек тусанёт с тобой сегодня!`
      return phrase
    }
    if (Number(String(number)[String(number).length - 1]) >= 2
    && Number(String(number)[String(number).length - 1]) <= 4) {
      phrase = `${number} человека тусанут с тобой сегодня!`
      return phrase
    }
    if (number === 0) {
      phrase = 'Никто с тобой не тусанёт!'
      return phrase
    }
    phrase = `${number} человек тусанёт с тобой сегодня!`
    return phrase
  }

  return (
    <>
      <h3 className={users.length ? 'badge bg-primary' : 'badge bg-danger'}>{renderPhrase(users.length)}</h3>
      <table className="table table-striped" hidden={!users.length}>
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Удалить</th>
          </tr>
        </thead>
        <tbody>
          {users.map((it) => (
            <tr key={it._id}>
              <td>{it.name}</td>
              <td>
                {it.qualities.map((item) => {
                  const classBadgeColor = `badge bg-${item.color} mx-1`
                  return (
                    <span className={classBadgeColor} key={item._id}>{item.name}</span>
                  )
                })}

              </td>
              <td>{it.profession.name}</td>
              <td>{it.completedMeetings}</td>
              <td>{it.rate}</td>
              <td>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                    handleDelete(it._id)
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
