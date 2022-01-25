/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getById } from '../../../api/fake.api/user.api'

const UserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  useEffect(() => {
    getById(id).then((data) => setUser(data))
  }, [])
  const editURL = `/users/${id}/edit`

  if (user) {
    return (
      <>
        <div className="fw-bold mx-1 fs-1">{user.name}</div>
        <div className="mx-1 fs-1">
          Профессия:
          {' '}
          {user.profession.name}
        </div>
        {user.qualities.map((it) => {
          const classBadgeColor = `badge bg-${it.color} mx-1 fs-6`
          return (
            <h5 className={classBadgeColor} key={it._id}>{it.name}</h5>)
        })}
        <div className="mx-1 fs-6">
          Completed Meetings:
          {' '}
          {user.completedMeetings}
        </div>
        <div className="mx-1 fs-2">
          Rate:
          {' '}
          {user.rate}
        </div>
        <Link to={editURL}><button className="mx-1 fs-6" type="button">Change</button></Link>
      </>
    )
  }
  return <div>LOADING...</div>
}

export default UserPage
