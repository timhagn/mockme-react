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
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 160,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
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

  handleClick = event => {
    const {
      deviceName,
      deviceOrientation,
    } = this.state
    // Calculate "responsive" device screen-size.
    const width = deviceWidth(deviceName, deviceOrientation),
          height = deviceHeight(deviceName, deviceOrientation)
    const screengrabURI =
        `http://th_back.web.test/mockme/cs?url=${this.urlInput.current.value}&w=${width}&h=${height}`
    this.setState({ url: screengrabURI  })
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
        <section>
          <div className="dropzone">
            <Dropzone
                accept="image/*"
                multiple={false}
                onDrop={this.onDrop}>
              <p>Drop your image to MockUp here, or click to select.</p>
            </Dropzone>
          </div>
          <CaptureURIInput ref={this.urlInput} onClick={this.handleClick}/>
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
          <aside style={thumbsContainer}>
            {thumbs}
          </aside>

          <MockMeUp srcImage={srcFile}
                    deviceName={this.state.deviceName}
                    deviceOrientation={this.state.deviceOrientation}
                    deviceColor={this.state.deviceColor}
                    mockUpStyle={`background-size: ${this.state.imageSize};`} />
        </section>
    );
  }
}

export default DropzoneWithPreview