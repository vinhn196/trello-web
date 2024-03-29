import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'


function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl size='small' sx={{ minWidth:'120px' }}>
      <InputLabel
        id="light-dark-select-mode"
        sx={{
          color: 'white',
          '&.Mui-focused':{ color:'white' }
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="light-dark-select-mode"
        id="select-light-dark"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          width: '120px',
          '.MuiOutlinedInput-notchedOutline':{ borderColor:'white' },
          '&:hover .MuiOutlinedInput-notchedOutline':{ borderColor:'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{ borderColor:'white' },
          '.MuiSvgIcon-root':{ color:'white' },
          color:'white'
          // '& .MuiOutlinedInput-input': {
          //   display: 'flex',
          //   alignItems: 'center',
          //   gap:1
          // }
        }}
      >
        <MenuItem value='light'>
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
            <SettingsBrightnessIcon fontSize='small' />
              System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect