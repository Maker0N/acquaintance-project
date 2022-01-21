/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'

const CheckBoxField = ({
  name, value, onChange, children, error,
}) => {
  const handleChange = () => {
    onChange({ name, value: !value })
  }
  const toggleClass = () => (!error ? 'form-check-input' : 'form-check-input is-invalid')
  return (
    <div className="mb-3">
      <div className="form-check">
        <input
          className={toggleClass()}
          type="checkbox"
          value=""
          id={name}
          onChange={handleChange}
          checked={value}
        />
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
        {error ? <div className="invalid-feedback">{error}</div> : <div />}
      </div>
    </div>
  )
}

CheckBoxField.defaultProps = {
  children: undefined,
  error: undefined,
}

CheckBoxField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export default CheckBoxField
