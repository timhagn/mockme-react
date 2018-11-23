import React from 'react'
import Dropzone from 'react-dropzone'
import MockMeUp from "./MockMeUp";

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
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
      files: []
    };
  }

  onDrop(files) {
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

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    const {files} = this.state;
    for (let i = files.length; i >= 0; i--) {
      const file = files[0];
      URL.revokeObjectURL(file.preview);
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

    const srcFile = Array.isArray(files) && files.length > 0 ? files[0].completeFile : ''

    return (
        <section>
          <div className="dropzone">
            <Dropzone
                accept="image/*"
                onDrop={this.onDrop.bind(this)}>
              <p>Drop your image to MockUp here, or click to select.</p>
            </Dropzone>

          </div>
          <aside style={thumbsContainer}>
            {thumbs}
          </aside>
          <MockMeUp srcImage={srcFile}
                    device="SurfaceStudio"
                    mockUpStyle="background-size: cover;" />
        </section>
    );
  }
}

export default DropzoneWithPreview