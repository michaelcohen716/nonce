import React from 'react'
import { Scene, Router, RouterProps } from 'react-native-router-flux'
import Login from './components/auth/Login'

export default function RouterComponent() {
  return (
    <Router>
      <Scene key="root">
        <Scene key="login" component={Login} />
      </Scene>
    </Router>
  )
}
