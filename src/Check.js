import React from 'react'
import PropTypes from 'prop-types'

/**
 * Returns a checkbox.
 * @param onChange
 * @param name
 * @param label
 * @param value
 * @param checked
 * @return {*}
 * @constructor
 */
const Check = ({ onChange,
                    name,
                    label,
                    checked = false }) => {
  console.log(name, label, checked)
  const checkString = checked ? `checked="checked"` : ``
  return (
      <div className="js-form-item form-item js-form-type-checkbox form-type-checkbox">
        <label htmlFor={`mm-checkbox-${name}`}>{label}</label>
        <input className="form-checkbox"
               name={`mm-checkbox-${name}`}
               type="checkbox"
               onChange={onChange}
               {...checkString} />
      </div>
  )
}


Check.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
}

export default Check