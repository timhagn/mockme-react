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
    this.mockupContainer = React.createRef()
    this.returnCanvas = React.createRef()
  }

  componentDidMount() {
    this.updateMockupContainer()
  }

  componentDidUpdate(prevProps) {
    const newProps = this.fixProps()

    if (newProps !== prevProps) {
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
    } = this.fixProps()

    const screenStyle = `
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
      canvas: this.returnCanvas.current
    })
    // .then((canvas) => {
    //   console.log('drew')
    // });
  }

  render() {
    const {
      style = {},
      deviceName,
      deviceOrientation,
    } = this.fixProps()

    const containerStyle = {
      minWidth: DEVICES[deviceName][deviceOrientation].image_width < 800 ?
          `${DEVICES[deviceName][deviceOrientation].image_width}px` : `800px`,
      ...style,
    }
    return (
        <>
          <div style={{
            position: `absolute`,
            top: -10000,
            right: 10000,
            opacity: 0,
          }}>
            <div ref={this.mockupContainer}
                 id="mockup"
                 style={{
                    ...containerStyle,}}></div>
          </div>
          <canvas ref={this.returnCanvas}
                  id="return-mockup" />
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