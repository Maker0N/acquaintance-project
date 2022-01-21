/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  label, value, onChange, option, error, defaultOption,
}) => {
  const optionArray = (!Array.isArray(option) && typeof option === 'object')
    ? Object.keys(option).map((optionName) => (
      { name: option[optionName].name, value: option[optionName]._id }))
    : option
  const toggleClass = () => (!error ? 'form-select' : 'form-select is-invalid')
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <div className="mb-3">
      <label htmlFor="select" className="form-label">{label}</label>
      <select
        className={toggleClass()}
        id="select"
        name="profession"
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">{defaultOption}</option>
        {optionArray && optionArray
          .map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
      </select>
      {error ? <div className="invalid-feedback">{error}</div> : <div />}
    </div>
  )
}

SelectField.defaultProps = {
  error: undefined,
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  option: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  error: PropTypes.string,
  defaultOption: PropTypes.string.isRequired,
}

export default SelectField
