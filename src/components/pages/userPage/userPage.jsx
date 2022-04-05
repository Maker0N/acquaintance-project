/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments'
import { getUserById } from '../../../store/users'

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId))

  const editURL = `/users/${userId}/edit`

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard
              id={user._id}
              name={user.name}
              professionId={user.profession}
              rate={user.rate}
              editURL={editURL}
              image={user.image}
            />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
      </div>
    )
  }
  return <div>LOADING...</div>
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default UserPage
