import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import createStore from './store/createStore'
import history from './utils/histoty'

const store = createStore()

const target = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  target,
)
