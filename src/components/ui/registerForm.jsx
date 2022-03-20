/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-return */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import validator from '../../utils/validator'
import { useQualities } from '../../hooks/useQualities'
import { useProfessions } from '../../hooks/useProfessions'
import { useAuth } from '../../hooks/useAuth'

const RegisterForm = () => {
  const history = useHistory()
  const [data, setData] = useState({
    email: '', name: '', password: '', profession: '', sex: 'male', qualities: [], licence: false,
  })
  const { signUp } = useAuth()
  const { professions } = useProfessions()
  const professionsList = professions.map((prof) => ({ label: prof.name, value: prof._id }))
  const { qualities } = useQualities()
  const qualitiesList = qualities.map((qual) => ({ label: qual.name, value: qual._id }))

  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Login is required!' },
      isEmail: { message: 'Email is not corrected!' },
    },
    name: {
      isRequired: { message: 'Name is required!' },
      isMin: { message: 'Name must not be less than 3 characters!', value: 3 },
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
    licence: {
      isRequired: {
        message: 'Agree licence is required!',
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValidate = validate()
    if (!isValidate) return
    const newData = {
      ...data,
      qualities: data.qualities.map((qual) => qual.value),
    }
    try {
      await signUp(newData)
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
        label="Name"
        name="name"
        type="text"
        value={data.name}
        onChange={(target) => handleChange(target)}
        error={errors.name}
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
        name="profession"
        defaultOption="Choose..."
        label="Your profession"
        value={data.profession}
        option={professionsList}
        onChange={handleChange}
        error={errors.profession}
      />
      <RadioField
        option={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Your sex"
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        name="qualities"
        label="Your qualities"
        defaultValue={data.qualities}
      />
      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}
      >
        Agree licence
      </CheckBoxField>
      <button type="submit" className="btn btn-primary w-100" disabled={!isValid}>Submit</button>
    </form>
  )
}

export default RegisterForm
