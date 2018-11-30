import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const drupalSettings = typeof window.drupalSettings !== 'undefined' ?
    window.drupalSettings : {}
const rootElement = drupalSettings.hasOwnProperty('mockmeRoot') ?
    drupalSettings.mockmeRoot : 'mockme-root'

class MockMe {
  constructor(container, settings = {}) {
    this._container = container;
    this._settings = settings;
    this._render();
  }

  _render() {
    ReactDOM.render(
        <App drupalSettings={this._settings}/>,
        this._container
    );
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this._container);
  }
}

ReactDOM.render(<App drupalSettings={drupalSettings}/>, document.getElementById(rootElement))

window.RenderMockMe = MockMe
export default MockMe

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
