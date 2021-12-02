import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Users from './components/Users/users'
import store from './redux/store'
import 'bootstrap/dist/css/bootstrap.css'

const target = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Users />
  </Provider>,
  target,
)
