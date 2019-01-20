import React from 'react'
import PropTypes from 'prop-types'

const Grid = ({ opacity, tickSpacing, width, height }) => {
  let gridLines = []

  const drawLine = (type, position) => {
    if (type === 'horizontal') {
      return (
        <line
          key={`h${position}`}
          x1="0"
          y1={position}
          x2={width}
          y2={position}
          stroke="black"
          strokeOpacity={opacity}
        />
      )
    }
    if (type === 'vertical') {
      return (
        <line
          key={`v${position}`}
          x1={position}
          y1="0"
          x2={position}
          y2={height}
          stroke="black"
          strokeOpacity={opacity}
        />
      )
    }
  }

  for (let offset=0; offset <= width; offset += tickSpacing) {
    gridLines.push(drawLine('vertical', offset))
  }
  for (let offset=0; offset <= height; offset += tickSpacing) {
    gridLines.push(drawLine('horizontal', offset))
  }

  return (
    <g>
      {gridLines}
    </g>
  )
}

Grid.propTypes = {
  tickSpacing: PropTypes.number.isRequired,
  opacity: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

Grid.defaultProps = {
  tickSpacing: 10,
  opacity: 0.1,
}

export default Grid
