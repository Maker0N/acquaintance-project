/* eslint-disable no-useless-return */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import validator from '../../utils/validator'
import { useAuth } from '../../hooks/useAuth'

const LoginForm = () => {
  const history = useHistory()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const { signIn } = useAuth()

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Login is required!' },
      isEmail: { message: 'Email is not corrected!' },
    },
    password: {
      isRequired: { message: 'Password is required!' },
      isCapital: { message: 'Password must contain capital letters!' },
      isSymbol: { message: 'Password must contain symbols!' },
      isMin: { message: 'Password must not be less than 8 characters!', value: 8 },
    },
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  useEffect(() => {
    validate()
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValidate = validate()
    if (!isValidate) return
    try {
      await signIn(data)
      history.push('/')
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <form className="w-100" onSubmit={(e) => handleSubmit(e)}>
      <TextField
        label="Login (email)"
        name="email"
        type="text"
        value={data.email}
        onChange={(target) => handleChange(target)}
        error={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={data.password}
        onChange={(target) => handleChange(target)}
        error={errors.password}
      />
      <CheckBoxField
        name="stayOn"
        value={data.stayOn}
        onChange={handleChange}
      >
        Stay on system
      </CheckBoxField>
      <button type="submit" className="btn btn-primary w-100" disabled={!isValid}>Submit</button>
    </form>
  )
}

export default LoginForm
