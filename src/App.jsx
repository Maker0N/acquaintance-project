import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header/header'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import User from './components/User/user'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/users/:id" component={User} />
      <Route path="/users/user" component={Login} />
      <Route path="/users" component={Users} />
      <Route path="/" component={Main} />
    </Switch>
  </>
)

export default App
