import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { getEnvVariables } from './HelperFunctions'

const envSettings = getEnvVariables()
const mockmeSettings = typeof window.drupalSettings !== 'undefined' &&
    window.drupalSettings.hasOwnProperty('mockmeSettings') ?
    window.drupalSettings.mockmeSettings
    : envSettings ? envSettings : {}
const rootElement = mockmeSettings.hasOwnProperty('mockmeRoot') ?
    mockmeSettings.mockmeRoot : 'mockme-root'

// console.log(typeof window.drupalSettings !== 'undefined' &&
//     window.drupalSettings.hasOwnProperty('mockmeSettings'), window.drupalSettings)

class MockMe {
  constructor(container, settings = {}) {
    this._container = container;
    this._settings = settings;
    this._render();
  }

  _render() {
    ReactDOM.render(
        <App mockmeSettings={this._settings}/>,
        this._container
    );
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this._container);
  }
}
const rootContainer = document.getElementById(rootElement)
if (rootContainer) {
  ReactDOM.render(<App mockmeSettings={mockmeSettings}/>, rootContainer)
}

window.RenderMockMe = MockMe
export default MockMe

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
