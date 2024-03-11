// eslint-disable-next-line no-unused-vars
import { useState, React } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '~/assets/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Template from './Menus/Templates'
import Starred from './Menus/Starred'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profiles'
import Button from '@mui/material/Button'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function AppBar() {
  const [searchValue, setSearchValue]= useState('')
  return (
    <Box px={2} sx={{
      height: (theme) => theme.trello.appBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflowX: 'auto',
      '&::-webkit-scrollbar-track': { m:1 },
      bgcolor: (theme) => (theme.palette.mode === 'dark' ?'#2c3e50' : '#1565c0' )
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white', fontSize:28 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color:'white', fontSize:24 }} />
          <Typography sx={{ color:'white', fontWeight:'bold', fontSize:'1.2rem' }}>Trello</Typography>
        </Box>
        <Box sx={{ display: { xs:'none', md:'flex' }, alignItems: 'center', gap: 0.5 }}>
          <Workspaces />
          <Recent />
          <Starred/>
          <Template />
          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': {
                border:'1px solid #f1f1f1'
              }
            }}
            variant='outlined'
            startIcon={<LibraryAddIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems:'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search ..."
          type="text"
          size='small'
          sx={{
            minWidth: '120px',
            maxWidth: '200px',
            color: 'white',
            '& label':{ color:'white' },
            '& input':{ color:'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value) }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color:'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize='small'
                sx={{ color: searchValue ? 'white':'transparent', cursor: 'pointer' }}
                onClick={() => setSearchValue('')}
              />
            )
          }}
        />
        <ModeSelect />
        <Badge color="warning" variant="dot">
          <Tooltip title="Notifications" >
            <NotificationsNoneIcon sx={{ fontSize: 25, color:'white' }} />
          </Tooltip>
        </Badge>
        <Badge color="secondary" variant="dot">
          <Tooltip title='Help'>
            <HelpOutlineIcon sx={{ color:'white' }} />
          </Tooltip>
        </Badge>
        <Profile/>
      </Box>
    </Box>
  )
}

export default AppBar