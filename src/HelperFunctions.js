import DEVICES from "./DeviceConstants";

/**
 * Gathers environment variables and returns mockmeSettings object.
 * @return {{mockmeRoot: string, fieldName: string}}
 */
export const getEnvVariables = () => {
  // console.log(process.env)
  return ({
    mockmeRoot: process.env.REACT_APP_MOCKME_ROOT
        ? process.env.REACT_APP_MOCKME_ROOT
        : 'mockme-root',
    fieldName: process.env.REACT_APP_FIELD_NAME
        ?  process.env.REACT_APP_FIELD_NAME
        : '',
    sgEndpoint: process.env.REACT_APP_SG_ENDPOINT
        ?  process.env.REACT_APP_SG_ENDPOINT
        : '',
  })
}

/**
 * Fixes wrong selections for MockMeForm.
 * @param name
 * @param value
 * @param state
 * @return {*}
 */
export const checkChange = (name, value, state) => {
  if (name === 'imageSize') {
    return { [name]: value }
  }
  else {
    const deviceName = name === 'deviceName' ? value : state.deviceName,
        deviceOrientation = name === 'deviceOrientation' ? value : state.deviceOrientation,
        deviceColor = name === 'deviceColor' ? value : state.deviceColor

    const currentOrientation =
        (DEVICES[deviceName].hasOwnProperty(deviceOrientation) &&
            Array.isArray(DEVICES[deviceName][deviceOrientation].color)) ?
            deviceOrientation :
            Object.keys(DEVICES[deviceName])[0]

    const currentColor =
        DEVICES[deviceName][currentOrientation].color.indexOf(deviceColor) === -1 ?
            DEVICES[deviceName][currentOrientation].color[0] :
            deviceColor

    return {
      deviceName,
      deviceOrientation: currentOrientation,
      deviceColor: currentColor,
    }
  }
}

/**
 * Diffs props for MockMeUp.
 * @param prevProps
 * @param newProps
 * @return {boolean}
 */
export const arePropsDifferent = (prevProps, newProps) => (
    prevProps.deviceColor !== newProps.deviceColor ||
    prevProps.deviceName !== newProps.deviceName ||
    prevProps.deviceOrientation !== newProps.deviceOrientation ||
    prevProps.mockUpStyle !== newProps.mockUpStyle ||
    prevProps.srcImage !== newProps.srcImage
)