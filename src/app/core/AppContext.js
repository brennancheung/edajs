import React, { useContext } from 'react'
import PropTypes from 'prop-types'

export const AppContext = React.createContext({})
export const Consumer = AppContext.Consumer
export const Provider = AppContext.Provider

class AppContextBase extends React.Component {
  state = {
    ...this.props.initialContext,

    setContext: (...args) => {
      // If the `setState` async callback is not passed in default to
      // return a Promise.
      return new Promise((resolve, reject) => {
        if (args.length > 1) {
          // The Promise will never resolve when a callback is passed
          // but that's ok, because we are using the callback not an await.
          return this.setState(...args)
        }
        setImmediate(() => { window.context = this.state })
        this.setState(...args, resolve)
      })
    },
  }

  componentDidMount () {
    // For debugging and development convenience
    window.context = this.state
    window.setContext = this.state.setContext
  }

  render () {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}

AppContextBase.propTypes = {
  initialContext: PropTypes.object
}

AppContextBase.defaultProps = {
  initialContext: {}
}

export const withAppContext = Component => props =>
  <Consumer>
    {
      ({ setContext, ...rest }) =>
        <Component
          {...props}
          setContext={setContext}
          context={rest}
        />
    }
  </Consumer>

export const useAppContext = () => useContext(AppContext)

export default AppContextBase
