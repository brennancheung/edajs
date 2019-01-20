import React from 'react'
import PropTypes from 'prop-types'

const Grid = ({ opacity, minorTick, majorTick, width, height }) => {
  let gridLines = []

  const drawLine = (type, position) => {
    let strokeOpacity = position % majorTick === 0 ? opacity * 2 : opacity
    if (type === 'horizontal') {
      return (
        <line
          key={`h${position}`}
          x1="0"
          y1={position}
          x2={width}
          y2={position}
          stroke="black"
          strokeOpacity={strokeOpacity}
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
          strokeOpacity={strokeOpacity}
        />
      )
    }
  }

  for (let offset=0; offset <= width; offset += minorTick) {
    gridLines.push(drawLine('vertical', offset))
  }
  for (let offset=0; offset <= height; offset += minorTick) {
    gridLines.push(drawLine('horizontal', offset))
  }

  return (
    <g>
      {gridLines}
    </g>
  )
}

Grid.propTypes = {
  minorTick: PropTypes.number.isRequired,
  majorTick: PropTypes.number.isRequired,
  opacity: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

Grid.defaultProps = {
  tickSpacing: 10,
  opacity: 0.1,
}

export default Grid
