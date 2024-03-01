import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { blue, teal, deepOrange, cyan, orange } from '@mui/material/colors'


// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
        text: {
          secondary: blue[500]
        }
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
  // ...other properties
})
export default theme
