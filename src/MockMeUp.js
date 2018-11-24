import React from "react";
import 'html5-device-mockups/dist/device-mockups.min.css'
import html2canvas from 'html2canvas'
import PropTypes from "prop-types"
import DEVICES from "./DeviceConstants";

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
      device = 'Chromebook',
      deviceOrientation = 'portrait',
      deviceColor = DEVICES[device][deviceOrientation].color[0],
      deviceInnerWidth = 'min-width: 100%;',
      mockUpStyle,
    } = this.props

    const screenStyle = `
      background-image: url('${mockupImage}');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      ${mockUpStyle}
    `

    this.mockupContainer.current.innerHTML = htmlTemplate
        .replace('{mockup-device}', device)
        .replace('{mockup-orientation}', deviceOrientation)
        .replace('{mockup-color}', deviceColor)
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

  componentDidMount() {
    this.updateMockupContainer()
  }

  componentDidUpdate(prevProps) {
    const { srcImage } = this.props
    if (prevProps.srcImage !== srcImage) {
      this.loadImage()
    }
  }

  render() {
    const { style = {} } = this.props
    const containerStyle = {
      minWidth: '800px',
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
  device: PropTypes.string,
  deviceOrientation: PropTypes.string,
  deviceColor: PropTypes.string,
  deviceInnerWidth: PropTypes.string,
  mockUpStyle: PropTypes.string,
}

export default MockMeUp