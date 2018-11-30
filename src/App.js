import React, { Component } from 'react';
import './App.css';
import DropzoneWithPreview from "./DropzonePreview";

class App extends Component {
  render() {
    // console.log('settingsApp', this.props.drupalSettings)
    return (
      <div className="field--type-image field--name-field-image field--widget-image-image js-form-wrapper form-wrapper"
           style={{
             marginBottom: `2rem`,
           }}>
          <DropzoneWithPreview drupalSettings={this.props.drupalSettings} />
      </div>
    );
  }
}

export default App;
