import React, { Component } from 'react';
import './App.css';
import DropzoneWithPreview from "./DropzonePreview";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <DropzoneWithPreview />
        </header>
      </div>
    );
  }
}

export default App;
