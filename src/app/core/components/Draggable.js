import React from 'react'
import parseMouseEvent from 'core/helpers/parseMouseEvent'
import { compose } from 'ramda'
import { withAppContext } from 'core/AppContext'

class Draggable extends React.Component {
  state = {
    x: 0,
    y: 0,
    cursor: 'pointer',
  }

  handleMouseDown = e => {
    const { buttons } = parseMouseEvent(e)
    if (buttons.left) {
      e.stopPropagation()
      e.preventDefault()
    }

    this.startX = e.clientX
    this.startY = e.clientY
    this.setState({ cursor: 'move' })
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove = e => {
    const { buttons } = parseMouseEvent(e)
    if (!buttons.left) { return }
    const dx = e.clientX - this.startX
    const dy = e.clientY - this.startY
    this.startX = e.clientX
    this.startY = e.clientY
    const { scale } = this.props.context
    const x = this.state.x + dx / scale
    const y = this.state.y + dy / scale
    this.setState({ x, y })
    if (this.props.onChange) { this.props.onChange({ x, y }) }
  }

  handleMouseUp = e => {
    document.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseEnter = e => {
    this.setState({ cursor: 'move' })
  }

  handleMouseLeave = e => {
    this.setState({ cursor: 'pointer' })
  }

  render () {
    const { children } = this.props
    const { cursor, x, y } = this.state
    return (
      <g
        style={{ cursor }}
        transform={`translate(${x}, ${y})`}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children}
      </g>
    )
  }
}

export default compose(
  withAppContext,
)(Draggable)
