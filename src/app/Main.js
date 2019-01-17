import React from 'react'
import ExperimentsPage from 'components/pages/ExperimentsPage'
import HomePage from 'components/pages/HomePage'
import LoginPage from 'components/pages/LoginPage'
import Navbar from 'components/Navbar'
import { Redirect, Route, Switch } from 'react-router-dom'
import { withAppContext } from 'core/AppContext'

const Main = ({ context }) => {
  const loggedIn = !!context.user

  const renderLoggedIn = () => (
    <Navbar>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/experiments" component={ExperimentsPage} />
        <Redirect to="/" />
      </Switch>
    </Navbar>
  )

  return (
    <div id="main-container">
      {loggedIn && renderLoggedIn()}
      {!loggedIn && <LoginPage />}
    </div>
  )
}

export default withAppContext(Main)
