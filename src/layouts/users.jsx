/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import SearchStatus from '../components/ui/searchStatus'
import Input from '../components/common/input'
import UsersTable from '../components/ui/usersTable'
import Pagination from '../components/common/pagination'
import GroupList from '../components/common/groupList'
import api from '../api'
import paginate from '../utils/paginate'
import dinamicSort from '../utils/dinamicSort'
import '../styles/main.css'

const Users = () => {
  const [users, setUsers] = useState([])
  const [searchUsers, setSearchUsers] = useState([])

  // ----------------data from array-----------------
  // const [professions, setProfessions] = useState([])

  // ----------------data from object-----------------
  const [professionsObject, setProfessionsObject] = useState({})
  const [selectedProf, setSelectedProf] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [usersWereLoaded, setUsersWereLoaded] = useState(false)
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc', downUp: true })
  const [search, setSearch] = useState('')

  const pageSize = 4
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  useEffect(() => {
    api.users.fetchAll().then((data) => setSearchUsers(data))
    api.users.fetchAll().then((data) => setUsers(data)).then(() => setUsersWereLoaded(true))
  }, [])

  // ----------------data from array-----------------
  // useEffect(() => {
  //   api.professions.fetchAll()
  //     .then((data) => setProfessions(data))
  // }, [])

  // ----------------data from object-----------------
  useEffect(() => {
    api.professionsObject.fetchAll()
      .then((data) => setProfessionsObject(data))
  }, [])

  const clearSearch = () => {
    setSearch('')
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    clearSearch()
    setUsers(searchUsers)
  }

  const filteredUsers = Object.keys(selectedProf).length !== 0
    ? users.filter((it) => it.profession.name === selectedProf.name)
    : users
  const itemsCount = filteredUsers.length
  const sortedUsers = filteredUsers.sort(dinamicSort(sortBy.path, sortBy.order))
  const usersCrop = paginate(sortedUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf({})
  }

  const handleBookMark = (userId) => {
    setUsers(users.map((it) => {
      if (it._id === userId && it.bookmark === false) {
        return { ...it, bookmark: true }
      } if (it._id === userId && it.bookmark === true) {
        return { ...it, bookmark: false }
      }
      return it
    }))
  }

  const handleDelete = (userId) => {
    setUsers(users.filter((it) => it._id !== userId))
  }

  const handleSort = (item) => {
    setSortBy(item)
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

  const getInput = ({ target }) => {
    setSearch(target.value)
    setUsers(searchUsers)
    setUsers((prev) => prev.filter((item) => item.name
      .toLowerCase()
      .includes(target.value)))
    clearFilter()
  }

  return (
    <>
      {usersWereLoaded
        ? (
          <SearchStatus
            itemsCount={itemsCount}
            renderPhrase={(number) => renderPhrase(number)}
            handleDelete={(userId) => handleDelete(userId)}
          />
        )
        : <span>Loading...</span>}
      <div className="d-flex m-2 h-10">
        {users.length
          ? (
            <div>
              <GroupList
                // ----------------data from array-----------------
                // professions={professions}
                // ----------------data from object-----------------
                professions={professionsObject}
                onItemSelect={(item) => handleProfessionSelect(item)}
                selectedItem={selectedProf}
                handlePageChange={handlePageChange}
              />
              <button
                type="button"
                className="btn btn-secondary mt-2 me-2"
                onClick={clearFilter}
              >
                Сброс фильтра
              </button>

            </div>
          )
          : null}
        <div>
          <Input
            name="search"
            onChange={(target) => getInput(target)}
            value={search}
          />
          <UsersTable
            users={users}
            usersCrop={usersCrop}
            handleDelete={(userId) => handleDelete(userId)}
            handleBookMark={(userId) => handleBookMark(userId)}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            onSort={(item) => handleSort(item)}
            selectedSort={sortBy}
          />
        </div>
      </div>
      <Pagination
        itemsCount={itemsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  )
}

export default Users
