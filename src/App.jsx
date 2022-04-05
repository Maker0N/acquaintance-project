import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/ui/header'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import LogOut from './layouts/logOut'
// import UserPage from './components/pages/userPage/userPage'
import UserEdit from './components/pages/userPage/userEdit'
import ProtectedRoute from './components/common/protectedRote'
import AppLoader from './components/ui/hoc/appLoader'

const App = () => (
  <>
    <AppLoader>
      <Header />
      <Switch>
        <Route path="/login/type?" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={LogOut} />
        <Route path="/users/:id/edit" component={UserEdit} />
        {/* <Route path="/users/:id" component={UserPage} /> */}
        <ProtectedRoute path="/users/:userId?" component={Users} />
        <Route path="/users/user" component={Login} />
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </AppLoader>
    <ToastContainer />
  </>
)

export default App
