import React from 'react'
import ToolButton from './ToolButton'

import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import LabelIcon from '@material-ui/icons/Label'
import PanToolIcon from '@material-ui/icons/PanTool'
import SelectAllIcon from '@material-ui/icons/SelectAll'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import StraightenIcon from '@material-ui/icons/Straighten'
import TextFormatIcon from '@material-ui/icons/TextFormat'

// These might be useful for other things later on
// import BuildIcon from '@material-ui/icons/Build'
// import SettingsIcon from '@material-ui/icons/Settings'
// import ZoomInIcon from '@material-ui/icons/ZoomIn'
// import ZoomOutIcon from '@material-ui/icons/ZoomOut'
// import VisibilityIcon from '@material-ui/icons/Visibility'

import { compose } from 'ramda'
import { withAppContext } from 'core/AppContext'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  tool: {
    border: '1px solid black',
    textAlign: 'center',
  },
})

class ToolPalette extends React.Component {
  render () {
    return (
      <div>
        <ToolButton
          Icon={PanToolIcon}
          tool="move"
          text="move"
          hotkey="v"
        />
        <ToolButton
          Icon={SelectAllIcon}
          tool="select"
          text="select"
          hotkey="s"
        />
        <ToolButton
          Icon={DeleteIcon}
          tool="delete"
          text="delete"
          hotkey="del"
        />
        <ToolButton
          Icon={LabelIcon}
          tool="label"
          text="assign label"
          hotkey="l"
        />
        <ToolButton
          Icon={AddIcon}
          tool="add"
          text="add component"
          hotkey="a"
        />
        <ToolButton
          Icon={EditIcon}
          tool="edit"
          text="edit properties"
          hotkey="e"
        />
        <ToolButton
          Icon={StraightenIcon}
          tool="measure"
          text="measure"
          hotkey="m"
        />
        <ToolButton
          Icon={TextFormatIcon}
          tool="text"
          text="text"
          hotkey="t"
        />
        <ToolButton
          Icon={ShowChartIcon}
          tool="wire"
          text="wire"
          hotkey="w"
        />
      </div>
    )
  }
}

export default compose(
  withAppContext,
  withStyles(styles),
)(ToolPalette)
