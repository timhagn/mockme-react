import React, { Component } from 'react';
import './App.css';
import DropzoneWithPreview from "./DropzonePreview";

class App extends Component {
  render() {
    // console.log('settingsApp', this.props.mockmeSettings)
    return (
      <div className="field--type-image field--name-field-image field--widget-image-image js-form-wrapper form-wrapper"
           style={{
             marginBottom: `2rem`,
           }}>
          <DropzoneWithPreview mockmeSettings={this.props.mockmeSettings} />
      </div>
    );
  }
}

export default App;
