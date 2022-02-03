import React from 'react'
import PropTypes from 'prop-types'

const TextAreaField = ({
  onChange, name, value, error,
}) => {
  const handleChange = ({ target }) => {
    onChange(target.value)
  }
  const toggleClass = () => (!error ? 'form-control w-100' : 'form-control is-invalid w-100')
  return (
    <>
      <textarea
        name={name}
        value={value}
        id="textarea"
        rows="3"
        className={toggleClass()}
        onChange={handleChange}
      />
      {error ? <div className="invalid-feedback">{error}</div> : <div />}
    </>
  )
}

TextAreaField.defaultProps = {
  error: undefined,
}

TextAreaField.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
}

export default TextAreaField
