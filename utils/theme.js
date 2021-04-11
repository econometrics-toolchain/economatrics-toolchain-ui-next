import { deepPurple, green, red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
    palette: {
      primary: {
        main: deepPurple[800]
      },
      secondary: {
        main: red[400]
      },
      success: {
        main: green[800]
      }
    }
  })