/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({
  option, value, onChange, name, label,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div>
        {option.map((item) => (
          <div className="form-check form-check-inline" key={`${item.name}_${item.value}`}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={`${item.name}_${item.value}`}
              value={item.value}
              onChange={handleChange}
              checked={item.value === value}
            />
            <label className="form-check-label" htmlFor={`${item.name}_${item.value}`}>{item.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

RadioField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  option: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default RadioField
