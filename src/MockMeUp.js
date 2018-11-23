import React from "react";
import 'html5-device-mockups/dist/device-mockups.min.css'
import html2canvas from 'html2canvas'
import PropTypes from "prop-types"

const htmlTemplate = `
<div class="device-wrapper" style="{device-width}">
  <div class="device" data-device="{mockup-device}" data-orientation="portrait" data-color="black">
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

  updateMockupContainer = (image = '') => {
    const {
      device,
      deviceInnerWidth,
      mockUpStyle,
    } = this.props

    const screen = `
      background-image: url('${image}');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      ${mockUpStyle}
    `

    this.mockupContainer.current.innerHTML = htmlTemplate
        .replace('{mockup-device}', device ? device : 'Chromebook')
        .replace('{screen-style}', screen)
        .replace('{device-width}', deviceInnerWidth ? deviceInnerWidth : 'min-width: 100%;')
        .replace('{link}', '')
    if (image) {
      html2canvas(this.mockupContainer.current).then(function (canvas) {
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
        <div>
          <div ref={this.mockupContainer}
               id="mockup"
               style={{...containerStyle,}}></div>
        </div>
    );
  }
}

MockMeUp.propTypes = {
  style: PropTypes.object,
  srcImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  device: PropTypes.string,
  deviceInnerWidth: PropTypes.string,
  mockUpStyle: PropTypes.string,
}

export default MockMeUp