import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SelectField from '../form/selectField'
import TextAreaField from '../form/textAreaField'
import validator from '../../../utils/validator'

const AddCommentForm = ({
  option, onSubmit, commentObj, onChangeSelect, onChangeTextArea,
}) => {
  const [errors, setErrors] = useState({})
  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Choose a name!',
      },
    },
    content: {
      isRequired: {
        message: 'Message cannot be empty!',
      },
    },
  };

  const validate = () => {
    const err = validator(commentObj, validatorConfig)
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(commentObj)
  }

  return (
    <>
      <h2>New comments</h2>
      <form>
        <SelectField
          name="name"
          option={option}
          defaultOption="Choose..."
          value={commentObj.userId}
          label=""
          onChange={onChangeSelect}
          error={errors.userId}
        />
        <TextAreaField
          name="content"
          value={commentObj.content}
          onChange={onChangeTextArea}
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
  option: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  // pageId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeSelect: PropTypes.func.isRequired,
  onChangeTextArea: PropTypes.func.isRequired,
  commentObj: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default AddCommentForm
