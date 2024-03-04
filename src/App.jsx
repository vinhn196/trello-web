// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
// import useMediaQuery from '@mui/material/useMediaQuery'

import './App.css'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120, marginTop:'10px' }}>
      <FormControl fullWidth >
        <InputLabel id="light-dark-select-mode">Mode</InputLabel>
        <Select
          labelId="light-dark-select-mode"
          id="select-light-dark"
          value={mode}
          label="Mode"
          onChange={handleChange}
          sx={{
            width: '120px'
            // '& .MuiOutlinedInput-input': {
            //   display: 'flex',
            //   alignItems: 'center',
            //   gap:1
            // }
          }}
        >
          <MenuItem value='light' >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LightModeIcon fontSize='small' />
              Light
            </Box>
          </MenuItem>
          <MenuItem value='dark' >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DarkModeOutlinedIcon fontSize='small' />
              Dark
            </Box>
          </MenuItem>
          <MenuItem value='system' >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SettingsBrightnessIcon fontSize='small'/>
              System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}


function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')

  return (
    <>
      <ModeSelect />
      <hr />
      <div>vinhnguyen</div>
      <Typography variant="body2" color='text.secondary'>Test</Typography>
      <Button>Text</Button>
      <Button variant='contained'color='success'>Text123</Button>
    </>
  )
}


export default App
