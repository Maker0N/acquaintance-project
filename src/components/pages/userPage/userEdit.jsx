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
import { update, getById } from '../../../api/fake.api/user.api'
import api from '../../../api'
import validator from '../../../utils/validator'

const UserEdit = () => {
  const { id } = useParams()
  const [editData, setEditData] = useState()
  const [professionsObject, setProfessionsObject] = useState()
  const [qualitiesObject, setQualitiesObject] = useState()
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getById(id).then((data) => setEditData(data))
    api.professionsObject.fetchAll()
      .then((data) => setProfessionsObject(data))
    api.qualities.fetchAll()
      .then((data) => setQualitiesObject(data))
  }, [])

  const handleChange = (target) => {
    setEditData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleProfession = (target) => {
    const [choisenProfession] = Object.keys(professionsObject)
      .filter((prof) => professionsObject[prof]._id === target.value)
    setEditData((prev) => ({
      ...prev,
      profession: {
        _id: target.value, name: professionsObject[choisenProfession].name,
      },
    }))
  }

  const handleQualities = (target) => {
    const newQualities = target.value
      .map((quality) => {
        const [colors] = Object.keys(qualitiesObject)
          .filter((item) => qualitiesObject[item]._id === quality.value)
        return ({
          _id: quality.value,
          name: quality.label,
          color: qualitiesObject[colors].color,
        })
      })
    setEditData((prev) => ({ ...prev, qualities: newQualities }))
  }

  let valueMultiSelect
  if (editData) {
    valueMultiSelect = editData.qualities
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
    const errors = validator(editData, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0
  useEffect(() => {
    validate()
  }, [editData])

  const handleSubmit = () => {
    const isValidate = validate()
    if (!isValidate) return
    update(id, editData)
  }

  if (editData && professionsObject && qualitiesObject) {
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
                onChange={handleProfession}
                option={professionsObject}
                value={editData.profession._id}
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
                onChange={handleQualities}
                options={qualitiesObject}
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
