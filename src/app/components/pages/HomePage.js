import React from 'react'
import { withAppContext } from 'core/AppContext'
import { compose } from 'ramda'

const Home = ({ context }) => (
  <div>
    <h1>Home</h1>
  </div>
)

export default compose(
  withAppContext,
)(Home)
