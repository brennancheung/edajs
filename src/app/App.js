import React from 'react'
import AppContext from 'core/AppContext'
import FirebaseContainer from 'core/FirebaseContainer'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import './app.css'
import Main from './Main'

const initialContext = {
  scale: 1.0,
  zoom: 1.25,
  offsetX: 0,
  offsetY: 0,
}

const themeOptions = {
  typography: {
    useNextVariants: true,
  }
}

class App extends React.Component {
  render () {
    const theme = createMuiTheme(themeOptions)

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppContext initialContext={initialContext}>
            <FirebaseContainer>
              <Main />
            </FirebaseContainer>
          </AppContext>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
