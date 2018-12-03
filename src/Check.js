import React from 'react'
import PropTypes from 'prop-types'

/**
 * Returns a checkbox.
 * @param onChange
 * @param name
 * @param label
 * @param value
 * @param isChecked
 * @return {*}
 * @constructor
 */
const Check = ({ onChange,
                 name,
                 label,
                 isChecked = false }) => {
  const checkboxName = `mm-checkbox-${name}`
  return (
      <div className="js-form-item form-item js-form-type-checkbox form-type-checkbox">
        <label htmlFor={checkboxName}>{label}</label>
        <input className="form-checkbox"
               name={checkboxName}
               type="checkbox"
               onChange={onChange}
               checked={isChecked} />
      </div>
  )
}


Check.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  isChecked: PropTypes.bool,
}

export default Check