import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/ui/header'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import User from './components/pages/userPage/userPage'
import UserEdit from './components/pages/userPage/userEdit'
import { QualitiesProvider } from './hooks/useQualities'
import { ProfessionProvider } from './hooks/useProfessions'

const App = () => (
  <>
    <Header />
    <QualitiesProvider>
      <ProfessionProvider>
        <Switch>
          <Route path="/login/type?" component={Login} />
          <Route path="/login" component={Login} />
          <Route exact path="/users" component={Users} />
          <Route path="/users/:id/edit" component={UserEdit} />
          <Route path="/users/:id" component={User} />
          <Route path="/users/user" component={Login} />
          <Route exact path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </ProfessionProvider>
    </QualitiesProvider>
    <ToastContainer />
  </>
)

export default App
