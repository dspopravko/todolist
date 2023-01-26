import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { App } from './app/App'
import { store } from './state/store'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
