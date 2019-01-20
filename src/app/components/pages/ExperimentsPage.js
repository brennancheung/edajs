import React from 'react'
import Draggable from 'core/components/Draggable'
import Grid from '@material-ui/core/Grid'
import SVGCanvas from 'core/components/SVGCanvas'
import ToolPalette from 'core/components/ToolPalette'
import { compose } from 'ramda'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
})

class ExperimentsPage extends React.Component {
  render () {
    return (
      <div>
        <h1>Experiments</h1>
        <Grid container spacing={8}>
          <Grid item xs={1}>
            <ToolPalette />
          </Grid>
          <Grid item xs={9}>
            <SVGCanvas width={700} height={800}>
              <Draggable onChange={this.handleDrag}>
                <g>
                  <rect
                    x="50"
                    y="50"
                    width="50"
                    height="50"
                    fill="#bbc42a"
                  />
                </g>
              </Draggable>
            </SVGCanvas>
          </Grid>
          <Grid item xs={2}>
            Future property inspector
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
)(ExperimentsPage)
