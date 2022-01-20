/* eslint-disable no-useless-return */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import validator from '../../utils/validator'
import api from '../../api'

const RegisterForm = () => {
  const [data, setData] = useState({ register: '', password: '', profession: '' })
  const [professionsObject, setProfessionsObject] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.professionsObject.fetchAll()
      .then((data) => setProfessionsObject(data))
  }, [])

  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const validatorConfig = {
    register: {
      isRequired: { message: 'Login is required!' },
      isEmail: { message: 'Email is not corrected!' },
    },
    password: {
      isRequired: { message: 'Password is required!' },
      isCapital: { message: 'Password must contain capital letters!' },
      isSymbol: { message: 'Password must contain symbols!' },
      isMin: { message: 'Password must not be less than 8 characters!', value: 8 },
    },
    profession: {
      isRequired: {
        message: 'Profession is required!',
      },
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValidate = validate()
    if (!isValidate) return
  }

  return (
    <form className="w-100" onSubmit={(e) => handleSubmit(e)}>
      <TextField
        label="Register (email)"
        name="register"
        type="text"
        value={data.register}
        onChange={(target) => handleChange(target)}
        error={errors.register}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={data.password}
        onChange={(target) => handleChange(target)}
        error={errors.password}
      />
      <SelectField
        defaultOption="Choose..."
        label="Your profession"
        value={data.profession}
        option={professionsObject}
        onChange={handleChange}
        error={errors.profession}
      />
      <button type="submit" className="btn btn-primary w-100" disabled={!isValid}>Submit</button>
    </form>
  )
}

export default RegisterForm
