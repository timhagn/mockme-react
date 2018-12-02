import React from "react";

export const DeviceCombo = ({onChange, selectedDevice = 'Chromebook', DEVICES}) => {
  const options = Object.keys(DEVICES).map(deviceName => {
    return (
        <option key={deviceName}
                value={deviceName}>
          {deviceName}
        </option>
    )
  })
  return (
      <div className="js-form-item form-item js-form-type-select form-type-select">
        <label htmlFor="mm-devices-select">Device</label>
        <select className="js-form-item form-item js-form-type-select form-type-select"
                name="mm-devices-select"
                id="devices"
                value={selectedDevice}
                onChange={onChange}>
          {options}
        </select>
      </div>
  )
}

export const OrientationCombo = ({deviceName, onChange, DEVICES}) => {
  const options = Object.keys(DEVICES[deviceName]).map(orientation => (
      <option key={orientation}
              value={orientation}>
        {orientation}
      </option>
  ))
  return (
      <div className="js-form-item form-item js-form-type-select form-type-select">
        <label htmlFor="mm-orientation-select">Orientation</label>
        <select className="js-form-item form-item js-form-type-select form-type-select"
                name="mm-orientation-select"
                id="orientation"
                onChange={onChange}>
          {options}
        </select>
      </div>
  )
}

export const ColorCombo = ({deviceName, deviceOrientation, onChange, DEVICES}) => {
  const currentOrientation =
      (DEVICES[deviceName].hasOwnProperty(deviceOrientation) &&
      Array.isArray(DEVICES[deviceName][deviceOrientation].color)) ?
          deviceOrientation :
          Object.keys(DEVICES[deviceName])[0]
  const options = DEVICES[deviceName][currentOrientation].color.map(color => (
      <option key={color}
              value={color}>
        {color}
      </option>
  ))
  return (
      <div className="js-form-item form-item js-form-type-select form-type-select">
        <label htmlFor="mm-color-select">Color</label>
        <select className="js-form-item form-item js-form-type-select form-type-select"
                name="mm-color-select"
                id="color"
                onChange={onChange}>
          {options}
        </select>
      </div>
  )
}

export const SizeCombo = ({onChange}) => (
    <div className="js-form-item form-item js-form-type-select form-type-select">
      <label htmlFor="mm-size-select">MockUp screen size</label>
      <select className="js-form-item form-item js-form-type-select form-type-select"
              name="mm-size-select"
              id="size"
              onChange={onChange}>
        <option value="contain">contain</option>
        <option value="cover">cover</option>
      </select>
    </div>
)