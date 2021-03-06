/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginForm from '../components/ui/loginForm'
import RegisterForm from '../components/ui/registerForm'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')
  const toggleFormType = () => {
    setFormType((prev) => (prev === 'register' ? 'login' : 'register'))
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'register'
            ? (
              <>
                <RegisterForm />
                <p>
                  Already have account?
                  <a role="button" onClick={toggleFormType} className="text-danger"> Sign In!</a>
                </p>
              </>
            ) : (
              <>
                <LoginForm />
                <p>
                  Dont have account?
                  <a role="button" onClick={toggleFormType} className="text-danger"> Sign Up!</a>
                </p>
              </>
            )}
        </div>
      </div>
    </div>
  )
}

export default Login
