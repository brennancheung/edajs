import React from 'react'
import Draggable from 'core/components/Draggable'
import SVGCanvas from 'core/components/SVGCanvas'

class ExperimentsPage extends React.Component {
  render () {
    return (
      <div>
        <h1>Experiments</h1>
        <SVGCanvas>
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
      </div>
    )
  }
}

export default ExperimentsPage
