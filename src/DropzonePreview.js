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
import CaptureURIInput from "./CaptureURI";

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

  handleChange = name => {
    if (!this.handlers[name]) {
      this.handlers[name] = event => {
        this.setState({ [name]: event.target.value })
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
      this.setState({
        files: [],
        url: screengrabURI,
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
    const {files} = this.state;
    // console.log('settingsDropzone', this.props.mockmeSettings)
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
          {this.props.mockmeSettings.sgEndpoint ?
            <CaptureURIInput ref={this.urlInput} onClick={this.handleClick}/>
          : ''}
          <div className="mm-devices">
            <DeviceCombo onChange={this.handleChange('deviceName')}
                         selectedDevice={this.state.deviceName}
                         DEVICES={DEVICES} />
            <OrientationCombo onChange={this.handleChange('deviceOrientation')}
                              deviceName={this.state.deviceName}
                              DEVICES={DEVICES} />
            <ColorCombo onChange={this.handleChange('deviceColor')}
                        deviceName={this.state.deviceName}
                        deviceOrientation={this.state.deviceOrientation}
                        DEVICES={DEVICES}/>
            <SizeCombo onChange={this.handleChange('imageSize')} />
          </div>
          <MockMeUp srcImage={srcFile}
                    deviceName={this.state.deviceName}
                    deviceOrientation={this.state.deviceOrientation}
                    deviceColor={this.state.deviceColor}
                    mockUpStyle={`background-size: ${this.state.imageSize};`}
                    mockmeSettings={this.props.mockmeSettings} />
        </>
    );
  }
}

export default DropzoneWithPreview