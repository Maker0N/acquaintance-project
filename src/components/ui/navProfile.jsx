/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const NavProfile = () => {
  const { currentUser } = useAuth()
  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => { setOpen((prev) => !prev) }
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt="img"
          height="40"
          className="image-responsive rounded-circle"
        />
      </div>
      <div className={isOpen ? 'w-100 dropdown-menu show' : 'w-100 dropdown-menu'}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
        <Link to="/logout" className="dropdown-item">LogOut</Link>
      </div>
    </div>
  )
}

export default NavProfile
