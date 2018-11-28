import React, { Component } from 'react';
import './App.css';
import DropzoneWithPreview from "./DropzonePreview";

class App extends Component {
  render() {
    return (
      <div className="field--type-image field--name-field-image field--widget-image-image js-form-wrapper form-wrapper"
           style={{
             marginBottom: `2rem`,
           }}>
          <DropzoneWithPreview />
      </div>
    );
  }
}

export default App;
