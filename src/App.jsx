// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
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
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth sx={{ marginTop:'3px' }}>
        <InputLabel id="light-dark-select-mode">Mode</InputLabel>
        <Select
          labelId="light-dark-select-mode"
          id="select-light-dark"
          value={mode}
          label="Mode"
          onChange={handleChange}
          sx={{
            width: '120px',
            '& .MuiOutlinedInput-input': {
              padding:'8px 5px'
            }
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

  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh', backgroundColor:'primary.main' }}>
      <Box sx={{
        backgroundColor: 'primary.light',
        height: (theme) => theme.trello.appBarHeight,
        width: '100%',
        display: 'flex',
        alignItems:'center'
      }}>
        <ModeSelect />
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        height: (theme) => theme.trello.boardBarHeight,
        width: '100%',
        display: 'flex',
        alignItems:'center'
      }}>
        Board Bar
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        width: '100%',
        display: 'flex',
        alignItems:'center'
      }}>
        Board Content
      </Box>
    </Container>
  )
}


export default App
