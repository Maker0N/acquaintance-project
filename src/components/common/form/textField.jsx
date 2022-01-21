/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({
  label, type, name, value, onChange, error,
}) => {
  const [showPass, setShowPass] = useState(false)
  const togglePass = () => {
    setShowPass((prev) => !prev)
  }
  const toggleClass = () => (!error ? 'form-control' : 'form-control is-invalid')

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <div className="mb-3">
      <label htmlFor={label} className="form-label">{label}</label>
      <div className="input-group has-validation">
        <input
          label={label}
          type={showPass ? 'text' : type}
          className={toggleClass()}
          name={name}
          value={value}
          onChange={handleChange}
          autoComplete="on"
        />
        {type === 'password'
          && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={togglePass}
          >
            {showPass
              ? <i className="bi bi-eye-slash-fill" />
              : <i className="bi bi-eye-fill" />}
          </button>
          )}
        {error ? <div className="invalid-feedback">{error}</div> : <div />}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  error: undefined,
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default TextField;
