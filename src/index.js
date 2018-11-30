import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const drupalSettings = typeof window.drupalSettings !== 'undefined' ?
    window.drupalSettings : {}
const rootElement = drupalSettings.hasOwnProperty('mockmeRoot') ?
    drupalSettings.mockmeRoot : 'mockme-root'

const reactNodes =
    ReactDOM.render(<App drupalSettings={drupalSettings}/>, document.getElementById(rootElement))

if (drupalSettings.hasOwnProperty('mockmeRoot')) {
  drupalSettings.mockmeReact = reactNodes
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()