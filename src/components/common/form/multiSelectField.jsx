/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = ({
  options, onChange, name, label, defaultValue,
}) => {
  const optionArray = (!Array.isArray(options) && typeof options === 'object')
    ? Object.keys(options).map((optionName) => (
      { label: options[optionName].name, value: options[optionName]._id }))
    : options
  const handleChange = (value) => {
    onChange({ name, value })
  }
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        options={optionArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
}

export default MultiSelectField
