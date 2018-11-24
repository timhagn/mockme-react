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
      <select id="devices"
              value={selectedDevice}
              onChange={onChange}>
        {options}
      </select>
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
      <select id="orientation" onChange={onChange}>
        {options}
      </select>
  )
}

export const ColorCombo = ({deviceName, deviceOrientation, onChange, DEVICES}) => {
  const currentOrientation =
      (DEVICES[deviceName].hasOwnProperty(deviceOrientation) &&
      Array.isArray(DEVICES[deviceName][deviceOrientation].color)) ?
          deviceOrientation :
          'portrait'
  const options = DEVICES[deviceName][currentOrientation].color.map(color => (
      <option key={color}
              value={color}>
        {color}
      </option>
  ))
  return (
      <select id="color" onChange={onChange}>
        {options}
      </select>
  )
}

export const SizeCombo = ({onChange}) => (
    <select id="color" onChange={onChange}>
      <option value="contain">contain</option>
      <option value="cover">cover</option>
    </select>
)