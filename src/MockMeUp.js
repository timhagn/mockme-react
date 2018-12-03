import React from 'react'
import 'html5-device-mockups/dist/device-mockups.min.css'
import html2canvas from 'html2canvas'
import PropTypes from 'prop-types'
import DEVICES from './DeviceConstants'
import { arePropsDifferent } from './HelperFunctions'

const htmlTemplate = `
<div class="device-wrapper" style="{device-width}">
  <div class="device" 
       data-device="{mockup-device}" 
       data-orientation="{mockup-orientation}" 
       data-color="{mockup-color}">
    <div class="screen" style="{screen-style}">
    </div>
    <!--<div class="button">-->
      <!--{link}-->
    <!--</div>-->
  </div>
</div>
`

class MockMeUp extends React.Component {
  constructor(props) {
    super(props);
    this.mockupContainer = React.createRef()
    this.returnCanvas = React.createRef()
  }

  componentDidMount() {
    this.updateMockupContainer()
  }

  componentDidUpdate(prevProps) {
    const newProps = this.fixProps()

    if (arePropsDifferent(prevProps, newProps)) {
      newProps.srcImage ? this.loadImage() : this.updateMockupContainer()
    }
  }

  fixProps = () => {
    const {
      deviceName = 'Chromebook',
      deviceOrientation = 'portrait',
      deviceColor = 'black',
    } = this.props

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
      ...this.props,
      deviceOrientation: currentOrientation,
      deviceColor: currentColor,
    }
  }

  isString = (isAString) =>
      Object.prototype.toString.call(isAString) === "[object String]"

  loadImage = () => {
    const { srcImage } = this.props

    if (srcImage && this.isString(srcImage)) {
      this.updateMockupContainer(srcImage)
    }
    else {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        this.updateMockupContainer(reader.result)
      }, false);

      if (srcImage) {
        reader.readAsDataURL(srcImage)
      }
    }
  }

  updateMockupContainer = (mockupImage = '') => {
    const {
      deviceName = 'Chromebook',
      deviceOrientation = 'portrait',
      deviceInnerWidth = 'min-width: 100%;',
      deviceColor = 'black',
      mockUpStyle,
      mockmeSettings,
    } = this.fixProps()

    const screenStyle = mockupImage === '' ? {} : `
      background-image: url('${mockupImage}');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      ${mockUpStyle}
    `
    this.mockupContainer.current.innerHTML = htmlTemplate
        .replace('{mockup-device}', deviceName)
        .replace('{mockup-orientation}', deviceOrientation.replace('_red', ''))
        .replace('{mockup-color}', deviceColor)
        .replace('{screen-style}', screenStyle)
        .replace('{device-width}', deviceInnerWidth)
        .replace('{link}', '')

    html2canvas(this.mockupContainer.current, {
      backgroundColor: null,
      useCORS: true,
      canvas: this.returnCanvas.current,
    }).then(() => {
      if (this.returnCanvas.current) {
        this.returnCanvas.current.style = {}
        // console.log(mockmeSettings)
        if (mockmeSettings.hasOwnProperty('fieldName')) {
          const hiddenMockMeField = mockmeSettings.hasOwnProperty('drupal')
              ? document
                  .querySelector(`input[name="${mockmeSettings.fieldName}`
                      + `[0][mockme_hidden]"]`)
              : document
                  .querySelector(`input[name="${mockmeSettings.fieldName}"]`)
          // console.log(hiddenMockMeField)
          if (hiddenMockMeField) {
            hiddenMockMeField.value = JSON.stringify({
              device: {
                deviceName,
                deviceOrientation,
                deviceColor
              },
              imageString: this.props.imageString,
            }) + '...---IMAGE-DATA---...' + this.returnCanvas.current.toDataURL()
          }
        }
      }
    })
  }

  render() {
    const {
      style = {},
      deviceName,
      deviceOrientation,
    } = this.fixProps()

    const deviceWidth = DEVICES[deviceName][deviceOrientation].image_width

    const containerStyle = {
      minWidth: deviceWidth < 800 ?
          `${deviceWidth}px` : `800px`,
          ...style,
    }
    return (
        <>
          <canvas ref={this.returnCanvas}
                  id="mockedme-canvas"
                  className="image-style-thumbnail mm-preview"
                  style={{
                    maxWidth: `100%`,
                    height: `auto`,
                  }}/>
          <div style={{
            position: `absolute`,
            top: -10000,
            right: 10000,
            opacity: 0,
          }}>
            <div ref={this.mockupContainer}
                 id="mockup"
                 style={{
                   ...containerStyle,
                 }} >
            </div>
          </div>
        </>
    );
  }
}

MockMeUp.propTypes = {
  style: PropTypes.object,
  srcImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  deviceName: PropTypes.string,
  deviceOrientation: PropTypes.string,
  deviceColor: PropTypes.string,
  deviceInnerWidth: PropTypes.string,
  mockUpStyle: PropTypes.string,
  imageString: PropTypes.string,
}

export default MockMeUp