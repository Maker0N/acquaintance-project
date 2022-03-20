/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import BackHistoryButton from '../../common/backButton'
import TextField from '../../common/form/textField'
import MultiSelectField from '../../common/form/multiSelectField'
import RadioField from '../../common/form/radioField'
import SelectField from '../../common/form/selectField'
import validator from '../../../utils/validator'
import { useAuth } from '../../../hooks/useAuth'
import { useProfessions } from '../../../hooks/useProfessions'
import { useQualities } from '../../../hooks/useQualities'

const UserEdit = () => {
  const { id } = useParams()
  const [editData, setEditData] = useState()
  const [errors, setErrors] = useState({})

  const { currentUser, update } = useAuth()
  const { professions } = useProfessions()
  const professionsList = professions.map((prof) => ({ label: prof.name, value: prof._id }))
  const { qualities } = useQualities()
  const qualitiesList = qualities.map((qual) => ({ label: qual.name, value: qual._id }))

  useEffect(() => {
    setEditData(currentUser)
  }, [])

  const handleChange = (target) => {
    if (target.name === 'qualities') {
      const qualityId = target.value.map((id) => id.value)
      setEditData((prev) => ({ ...prev, [target.name]: qualityId }))
    } else {
      setEditData((prev) => ({ ...prev, [target.name]: target.value }))
    }
  }

  let valueMultiSelect
  if (qualities) {
    const qual = qualities.filter((q) => {
      for (let i = 0; i < currentUser.qualities.length; i += 1) {
        if (currentUser.qualities[i] === q._id) {
          return q
        }
      }
      return qual
    })
    valueMultiSelect = qual
      .map((quality) => ({ label: quality.name, value: quality._id }))
  }

  const validatorConfig = {
    name: {
      isRequired: { message: 'Name is required!' },
    },
    email: {
      isRequired: { message: 'Email is required!' },
      isEmail: { message: 'Email is not corrected!' },
    },
  }
  const validate = () => {
    const errors = validator(currentUser, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0
  useEffect(() => {
    validate()
  }, [currentUser])

  const handleSubmit = () => {
    const isValidate = validate()
    if (!isValidate) return
    update(editData)
  }

  if (editData && currentUser._id === id) {
    return (
      <div className="container mt-3">
        <BackHistoryButton />
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form className="w-100">
              <TextField
                label="Name"
                type="text"
                name="name"
                onChange={handleChange}
                value={editData.name}
                error={errors.name}
              />
              <TextField
                label="Email"
                type="text"
                name="email"
                onChange={handleChange}
                value={editData.email}
                error={errors.email}
              />
              <SelectField
                label="Your profession"
                name="profession"
                defaultOption="Choose..."
                onChange={handleChange}
                option={professionsList}
                value={editData.profession}
              />
              <RadioField
                label="Your sex"
                name="sex"
                option={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' },
                ]}
                onChange={handleChange}
                value={editData.sex}
              />
              <MultiSelectField
                label="Your qualities"
                name="qualities"
                onChange={handleChange}
                options={qualitiesList}
                defaultValue={valueMultiSelect}
              />
              <Link
                to={isValid ? `/users/${id}` : '#'}
                type="button"
                className="btn btn-primary w-100"
                onClick={handleSubmit}
              >
                Submit
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
  return <div>LOADING...</div>
}

export default UserEdit
