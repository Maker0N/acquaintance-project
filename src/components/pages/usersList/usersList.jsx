/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import SearchStatus from '../../ui/searchStatus'
import Input from '../../common/input'
import UsersTable from '../../ui/usersTable'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import paginate from '../../../utils/paginate'
import dinamicSort from '../../../utils/dinamicSort'
import { useUser } from '../../../hooks/useUsers'
import { useProfessions } from '../../../hooks/useProfessions'
import { useAuth } from '../../../hooks/useAuth'
import '../../../styles/main.css'

const UsersList = () => {
  const { users } = useUser()
  const { professions } = useProfessions()
  const { currentUser } = useAuth()
  // const [searchUsers, setSearchUsers] = useState([])

  // ----------------data from array-----------------
  // const [professions, setProfessions] = useState([])

  // ----------------data from object-----------------
  const [selectedProf, setSelectedProf] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  // const [usersWereLoaded, setUsersWereLoaded] = useState(false)
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc', downUp: true })
  const [search, setSearch] = useState('')

  const pageSize = 5
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  // ----------------data from array-----------------
  // useEffect(() => {
  //   api.professions.fetchAll()
  //     .then((data) => setProfessions(data))
  // }, [])

  // ----------------data from object-----------------
  const clearSearch = () => {
    setSearch('')
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    clearSearch()
    // setUsers(searchUsers)
  }

  function filterUser(data) {
    const filteredUsers = Object.keys(selectedProf).length !== 0
      ? data.filter((it) => it.profession.name === selectedProf.name)
      : data
    return filteredUsers.filter((u) => u._id !== currentUser._id)
  }
  const filteredUsers = filterUser(users)

  const itemsCount = users.length
  const sortedUsers = filteredUsers.sort(dinamicSort(sortBy.path, sortBy.order))
  const usersCrop = paginate(sortedUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf({})
  }

  const handleBookMark = (userId) => {
    // setUsers(users.map((it) => {
    //   if (it._id === userId && it.bookmark === false) {
    //     return { ...it, bookmark: true }
    //   } if (it._id === userId && it.bookmark === true) {
    //     return { ...it, bookmark: false }
    //   }
    //   return it
    // }))
    console.log(userId)
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
    // setUsers(searchUsers)
    // setUsers((prev) => prev.filter((item) => item.name
    //   .toLowerCase()
    //   .includes(target.value)))
    clearFilter()
  }

  return (
    <>
      {users
        ? (
          <SearchStatus
            itemsCount={itemsCount}
            renderPhrase={(number) => renderPhrase(number - 1)}
          />
        )
        : <span>Loading...</span>}
      <div className="d-flex m-2 h-10">
        {users
          ? (
            <div>
              <GroupList
                // ----------------data from array-----------------
                // professions={professions}
                // ----------------data from object-----------------
                professions={professions}
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

export default UsersList
