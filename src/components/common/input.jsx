import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
  name, value, onChange,
}) => (
  <div className="mb-3">
    <input
      type="text"
      value={value}
      name={name}
      onChange={(e) => onChange(e)}
      placeholder="Search..."
      className="form-control"
    />
  </div>
)

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Input
