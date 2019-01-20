import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import { compose } from 'ramda'
import { withAppContext } from 'core/AppContext'
import parseMouseEvent from 'core/helpers/parseMouseEvent'

class SVGCanvas extends React.Component {
  canvasRef = React.createRef()
  state = {
    dragging: false,
  }

  getNumbers = e => {
    const { context, width, height } = this.props
    const { offsetX, offsetY, scale, zoom } = context
    const rect = this.canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const canvasRight = width / scale + offsetX
    const canvasBottom = height / scale + offsetY
    const canvasX = offsetX + (x / width) * (canvasRight - offsetX)
    const canvasY = offsetY + (y / height) * (canvasBottom - offsetY)
    const vars = { width, height, x, y, canvasRight, canvasBottom, canvasX, canvasY, offsetX, offsetY, scale, zoom }
    this.setState({ ...vars })
    return vars
  }

  handleWheel = e => {
    const { canvasX, canvasY, offsetX, offsetY, scale, zoom } = this.getNumbers(e)
    if (e.deltaY === 0) { return }
    const zoomIn = e.deltaY > 0
    const newScale = zoomIn ? scale * zoom : scale / zoom
    const newX = offsetX + (canvasX - offsetX) / 2.0 / scale
    const newY = offsetY + (canvasY - offsetY) / 2.0 / scale
    this.props.setContext({ scale: newScale, offsetX: newX, offsetY: newY })
    this.setState({ newX, newY })
  }

  handleMouseMove = e => {
    const { setContext } = this.props
    const { offsetX, offsetY, canvasX, canvasY } = this.getNumbers(e)
    if (this.state.dragging) {
      const dx = canvasX - this.startX
      const dy = canvasY - this.startY
      this.setState({ dx, dy })
      setContext({
        offsetX: offsetX - dx,
        offsetY: offsetY - dy
      })
    }
  }

  handleMouseDown = e => {
    const { buttons } = parseMouseEvent(e)
    if (buttons.middle) {
      const { canvasX, canvasY } = this.getNumbers(e)
      this.startX = canvasX
      this.startY = canvasY
      this.setState({ dragging: true })
      this.props.setContext({ cursor: 'grabbing' })
    }
  }

  handleMouseUp = e => {
    const { buttons } = parseMouseEvent(e)
    if (!buttons.middle) {
      this.setState({ dragging: false })
      this.props.setContext({ cursor: 'default' })
    }
  }

  render () {
    const { children, context, width, height } = this.props
    const { offsetX, offsetY, scale, cursor } = context
    const vbX = offsetX
    const vbY = offsetY
    const vbWidth = width / scale
    const vbHeight = height / scale

    return (
      <React.Fragment>
        <svg
          ref={this.canvasRef}
          width={width}
          height={height}
          style={{ border: '1px solid #000', cursor }}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onWheel={this.handleWheel}
          onMouseMove={this.handleMouseMove}
          viewBox={[vbX, vbY, vbWidth, vbHeight].join(' ')}
        >
          <Grid minorTick={10} majorTick={50} width={width} height={height} />
          {children}
        </svg>
        <pre>{JSON.stringify(this.state, null, 4)}</pre>
      </React.Fragment>
    )
  }
}

SVGCanvas.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}

SVGCanvas.defaultProps = {
  width: 600,
  height: 600,
}

export default compose(
  withAppContext,
)(SVGCanvas)
