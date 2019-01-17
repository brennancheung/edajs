import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import {
  Dashboard as DashboardIcon,
  NewReleases as NewReleasesIcon,
} from '@material-ui/icons'
import { withRouter } from 'react-router-dom'

const NavItems = ({ history }) => {
  const navTo = link => () => { history.push(link) }

  return (
    <React.Fragment>
      <List>
        <ListItem button onClick={navTo('/')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={navTo('/experiments')}>
          <ListItemIcon><NewReleasesIcon /></ListItemIcon>
          <ListItemText primary="Experiments" />
        </ListItem>
      </List>
    </React.Fragment>
  )
}

export default withRouter(NavItems)
