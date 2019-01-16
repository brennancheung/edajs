import React from 'react'
import { withAppContext } from 'core/AppContext'

const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

const fbConfig = {
  apiKey: 'AIzaSyACkcDQIN233O2wKBjztMswNMRpCMTP2ug',
  authDomain: 'eda-js.firebaseapp.com',
  databaseURL: 'https://eda-js.firebaseio.com',
  projectId: 'eda-js',
  storageBucket: 'eda-js.appspot.com',
  messagingSenderId: '219716071488',
}

class FirebaseContainer extends React.Component {
  state = {
    initializing: true
  }

  onAuthStateChanged = user => {
    this.props.setContext({ user })
    this.setState({ initializing: false })
  }

  handleSignIn = () => {
    const { firebase } = this.props.context
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
  }

  handleSignOut = () => {
    const { firebase } = this.props.context
    firebase.auth().signOut()
    this.props.setContext({ user: null })
  }

  componentDidMount () {
    if (!firebase.apps.length) {
      firebase.initializeApp(fbConfig)
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    const db = firebase.firestore()
    db.settings({
      timestampsInSnapshots: true
    })
    this.props.setContext({
      db,
      firebase,
      handleSignIn: this.handleSignIn,
      handleSignOut: this.handleSignOut,
    })
  }

  render () {
    if (this.state.initializing) { return null }
    return this.props.children
  }
}

export default withAppContext(FirebaseContainer)
