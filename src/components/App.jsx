/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import SearchStatus from './SearchStatus/searchStatus'
import Users from './Users/users'
import api from '../api'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleBookMark = (userId) => {
    setUsers(users.map((it) => {
      if (it._id === userId && it.bookmark === false) {
        return { ...it, bookmark: true }
      } if (it._id === userId && it.bookmark === true) {
        return { ...it, bookmark: false }
      }
      return it
    }))
    // it._id === userId && it.bookmark === false
    //   ? { ...it, bookmark: true }
    //   : (it._id === userId && it.bookmark === true)
    //     ? { ...it, bookmark: false }
    //     : it)))
  }

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
      <SearchStatus
        users={users}
        renderPhrase={(number) => renderPhrase(number)}
        handleDelete={(userId) => handleDelete(userId)}
      />
      <Users
        users={users}
        handleDelete={(userId) => handleDelete(userId)}
        handleBookMark={(userId) => handleBookMark(userId)}
      />
    </>
  )
}

export default App
