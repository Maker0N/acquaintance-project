/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getById, fetchAll } from '../../../api/fake.api/user.api'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments'

const UserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState()

  useEffect(() => {
    getById(id).then((data) => setUser(data))
    fetchAll().then((data) => setUsers(data))
  }, [])

  const editURL = `/users/${id}/edit`

  let usersForOption
  if (users) {
    usersForOption = users.map((it) => ({ name: it.name, value: it._id }))
  }

  if (user && users) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard
              name={user.name}
              profession={user.profession.name}
              rate={user.rate}
              editURL={editURL}
            />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments
              option={usersForOption}
              pageId={id}
            />
          </div>
        </div>
      </div>
    )
  }
  return <div>LOADING...</div>
}

export default UserPage
