import React from 'react'
import 'html5-device-mockups/dist/device-mockups.min.css'
import html2canvas from 'html2canvas'
import PropTypes from 'prop-types'
import DEVICES from './DeviceConstants'

const htmlTemplate = `
<div class="device-wrapper" style="{device-width}">
  <div class="device" 
       data-device="{mockup-device}" 
       data-orientation="{mockup-orientation}" 
       data-color="{mockup-color}">
    <div class="screen" style="{screen-style}">
    </div>
    <div class="button">
      {link}
    </div>
  </div>
</div>
`

class MockMeUp extends React.Component {
  constructor(props) {
    super(props);
    this.mockupContainer = React.createRef();
  }

  componentDidMount() {
    this.updateMockupContainer()
  }

  componentDidUpdate(prevProps) {
    const {
      srcImage,
      deviceName,
      deviceOrientation,
      deviceColor,
      mockUpStyle,
    } = this.props

    if (prevProps.srcImage !== srcImage) {
      this.loadImage()
    }
    if (prevProps.deviceName !== deviceName ||
        prevProps.deviceOrientation !== deviceOrientation ||
        prevProps.deviceColor !== deviceColor ||
        prevProps.mockUpStyle !== mockUpStyle) {
      srcImage ? this.loadImage() : this.updateMockupContainer()
    }
  }

  loadImage = () => {
    const { srcImage } = this.props
    const reader  = new FileReader();

    reader.addEventListener("load", () => {
      this.updateMockupContainer(reader.result)
    }, false);

    if (srcImage) {
      reader.readAsDataURL(srcImage)
    }
  }

  updateMockupContainer = (mockupImage = '') => {
    const {
      deviceName = 'Chromebook',
      deviceOrientation = 'portrait',
      deviceInnerWidth = 'min-width: 100%;',
      deviceColor = 'black',
      mockUpStyle,
    } = this.props

    const screenStyle = `
      background-image: url('${mockupImage}');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      ${mockUpStyle}
    `
    const currentOrientation =
        (DEVICES[deviceName].hasOwnProperty(deviceOrientation) &&
            Array.isArray(DEVICES[deviceName][deviceOrientation].color)) ?
            deviceOrientation :
            'portrait'

    const currentColor =
        DEVICES[deviceName][currentOrientation].color.indexOf(deviceColor) === -1 ?
            DEVICES[deviceName][currentOrientation].color[0] :
            deviceColor

    this.mockupContainer.current.innerHTML = htmlTemplate
        .replace('{mockup-device}', deviceName)
        .replace('{mockup-orientation}', currentOrientation.replace('_red', ''))
        .replace('{mockup-color}', currentColor)
        .replace('{screen-style}', screenStyle)
        .replace('{device-width}', deviceInnerWidth)
        .replace('{link}', '')

    if (mockupImage) {
      html2canvas(this.mockupContainer.current, {
        backgroundColor: null,
      }).then(function (canvas) {
        document.body.appendChild(canvas);
      });
    }
  }

  render() {
    const {
      style = {},
      deviceName,
      deviceOrientation,
    } = this.props

    const currentOrientation =
        (DEVICES[deviceName].hasOwnProperty(deviceOrientation) &&
            Array.isArray(DEVICES[deviceName][deviceOrientation].color)) ?
            deviceOrientation :
            'portrait'

    const containerStyle = {
      minWidth: DEVICES[deviceName][currentOrientation].image_width < 800 ?
          `${DEVICES[deviceName][currentOrientation].image_width}px` : `800px`,
      ...style,
    }
    return (
        <>
          <div ref={this.mockupContainer}
               id="mockup"
               style={{...containerStyle,}}></div>
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
}

export default MockMeUp