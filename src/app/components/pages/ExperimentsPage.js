import React from 'react'

class Draggable extends React.Component {
  state = {
    x: 0,
    y: 0,
    cursor: 'pointer',
  }

  handleMouseDown = e => {
    this.startX = e.clientX
    this.startY = e.clientY
    this.setState({ cursor: 'move' })
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove = e => {
    const dx = e.clientX - this.startX
    const dy = e.clientY - this.startY
    this.startX = e.clientX
    this.startY = e.clientY
    const x = this.state.x + dx
    const y = this.state.y + dy
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

class ExperimentsPage extends React.Component {
  width = 600
  height = 600
  render () {
    return (
      <div>
        <h1>Experiments</h1>
        <svg width={this.width} height={this.height} style={{ border: '1px solid #000' }}>
          <Draggable onChange={coords => console.log(coords)}>
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
        </svg>
      </div>
    )
  }
}

export default ExperimentsPage
