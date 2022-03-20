import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextAreaField from '../form/textAreaField'
import validator from '../../../utils/validator'

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prev) => ({
      ...prev,
      content: target,
    }))
  }
  const validatorConfig = {
    content: {
      isRequired: {
        message: 'Message cannot be empty!',
      },
    },
  };

  const validate = () => {
    const err = validator(data, validatorConfig)
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const clearForm = () => {
    setData({});
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }

  return (
    <>
      <h2>New comments</h2>
      <form>
        <TextAreaField
          name="content"
          value={data.content || ''}
          onChange={handleChange}
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary my-2" onClick={handleSubmit}>Send</button>
        </div>
      </form>
    </>
  )
}

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default AddCommentForm
