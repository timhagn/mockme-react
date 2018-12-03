import React from 'react'
import Dropzone from 'react-dropzone'
import MockMeUp from './MockMeUp'
import DEVICES, {deviceHeight, deviceWidth} from './DeviceConstants'
import {
  ColorCombo,
  DeviceCombo,
  OrientationCombo,
  SizeCombo
} from './ComboComponents'
import CaptureURIInput from './CaptureURI'
import Check from './Check'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  height: 200,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
}

const img = {
  display: 'block',
  height: '100%',
  width: 'auto',
};

class DropzoneWithPreview extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],
      deviceName: 'Chromebook',
      deviceOrientation: 'portrait',
      deviceColor: DEVICES['Chromebook']['portrait'].color[0],
      imageSize: 'contain',
      url: '',
      noogOption: false,
      resetOption: false,
    };
    this.handlers = [];
    this.urlInput = React.createRef()
  }

  onDrop = files => {
    this.setState({
      files: files.map(file => {
        return {
          ...file,
          completeFile: file,
          preview: URL.createObjectURL(file),
        }
      })
    });
  }

  checkChange = (name, value) => {
    if (name === 'imageSize') {
      return { [name]: value }
    }
    else {
      const deviceName = name === 'deviceName' ? value : this.state.deviceName,
          deviceOrientation = name === 'deviceOrientation' ? value : this.state.deviceOrientation,
          deviceColor = name === 'deviceColor' ? value : this.state.deviceColor

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
   * Automatically handle dropdowns.
   * @param name
   * @return {*}
   */
  handleChange = name => {
    if (!this.handlers[name]) {
      this.handlers[name] = event => {
        const newState = this.checkChange(name, event.target.value)
        this.setState(newState)
      }
    }
    return this.handlers[name]
  }

  /**
   * Handle checkboxes.
   * @param name
   * @return {*}
   */
  handleChecked = name => {
    if (!this.handlers[name]) {
      this.handlers[name] = event => {
        // console.log(name + `Option`)
        this.setState({ [name + `Option`]: event.target.checked })
      };
    }
    return this.handlers[name]
  }

  /**
   * Handles the click on 'Grab Screenshot' Button.
   * @param event
   */
  handleClick = event => {
    if (this.props.mockmeSettings.sgEndpoint && this.urlInput.current.value) {
      let grabURL = this.urlInput.current.value
      if (grabURL.indexOf("?") > 0) {
        grabURL = grabURL.substring(0, grabURL.indexOf("?"))
      }
      const {
        deviceName,
        deviceOrientation,
      } = this.state
      // Calculate "responsive" device screen-size.
      const width = deviceWidth(deviceName, deviceOrientation),
            height = deviceHeight(deviceName, deviceOrientation)

      const screengrabURI =
          `${this.props.mockmeSettings.sgEndpoint}?url=${grabURL}&w=${width}&h=${height}`
        + `${this.state.noogOption ? `&noog=true` : ``}`
        + `${this.state.resetOption ? `&reset=true` : ``}`

      // console.log(screengrabURI)
      this.setState({
        files: [],
        url: screengrabURI,
        resetOption: false,
      })
    }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    const {files} = this.state;
    for (let i = files.length; i >= 0; i--) {
      const file = files[i]
      URL.revokeObjectURL(file.preview)
    }
  }

  render() {
    const {
      files,
      noogOption,
      resetOption,
      deviceName,
      deviceOrientation,
      deviceColor,
      imageSize,
    } = this.state

    // console.log('settingsDropzone', this.state)
    const thumbs = files.map((file, index) => (
        <div style={thumb} key={`img-file-${index}`}>
          <div style={thumbInner}>
            <img
                src={file.preview}
                style={img}
                alt="Preview Container"
            />
          </div>
        </div>
    ));

    const srcFile = Array.isArray(files) && files.length > 0
        ? files[0].completeFile
        : this.state.url ? this.state.url : ''

    return (
        <>
          <div className="dropzone">
            <Dropzone
                accept="image/*"
                multiple={false}
                onDrop={this.onDrop}>
              <p>Drop your image to MockUp here, or click to select.</p>
            </Dropzone>
            <aside style={thumbsContainer}>
              {thumbs}
            </aside>
          </div>
          {this.props.mockmeSettings.sgEndpoint &&
              <>
                <CaptureURIInput ref={this.urlInput}
                                 onClick={this.handleClick} />
                <div className="mm-options">
                  <Check onChange={this.handleChecked(`noog`)}
                         name={`noog`}
                         label="No OpenGraph"
                         isChecked={noogOption} />
                  <Check onChange={this.handleChecked(`reset`)}
                         name={`reset`}
                         label="Reset Image"
                         isChecked={resetOption} />
                </div>
              </>
          }
          <div className="mm-devices">
            <DeviceCombo onChange={this.handleChange('deviceName')}
                         selectedDevice={deviceName}
                         DEVICES={DEVICES} />
            <OrientationCombo onChange={this.handleChange('deviceOrientation')}
                              deviceName={deviceName}
                              DEVICES={DEVICES} />
            <ColorCombo onChange={this.handleChange('deviceColor')}
                        deviceName={deviceName}
                        deviceOrientation={deviceOrientation}
                        DEVICES={DEVICES}/>
            <SizeCombo onChange={this.handleChange('imageSize')} />
          </div>
          <MockMeUp srcImage={srcFile}
                    deviceName={deviceName}
                    deviceOrientation={deviceOrientation}
                    deviceColor={deviceColor}
                    mockUpStyle={`background-size: ${imageSize};`}
                    mockmeSettings={this.props.mockmeSettings} />
        </>
    );
  }
}

export default DropzoneWithPreview