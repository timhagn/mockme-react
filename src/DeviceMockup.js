import React from "react";
import 'html5-device-mockups/dist/device-mockups.min.css'
import html2canvas from 'html2canvas'

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

class MockupIframe extends React.Component {
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
      deviceWidth,
      deviceStyle,
    } = this.props

    const screen = `
      background-image: url('${image}');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      ${deviceStyle}
    `

    this.mockupContainer.current.innerHTML = htmlTemplate
        .replace('{mockup-device}', device ? device : 'Chromebook')
        .replace('{screen-style}', screen)
        .replace('{device-width}', deviceWidth ? deviceWidth : 'min-width: 100%;')
        .replace('{link}', '')

    html2canvas(this.mockupContainer.current).then(function (canvas) {
      document.body.appendChild(canvas);
    });
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
    return (
        <div>
          <div ref={this.mockupContainer}
               id="mockup"></div>
        </div>
    );
  }
}

export default MockupIframe