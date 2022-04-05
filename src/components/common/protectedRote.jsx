/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'
import { getIsLoggedIn } from '../../store/users';

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isLoggedIn = useSelector(getIsLoggedIn)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return (
            <Redirect to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
            />
          )
        }
        return Component ? <Component {...props} /> : children
      }}
    />
  )
}

ProtectedRoute.defaultProps = {
  children: undefined,
  location: undefined,
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export default ProtectedRoute
