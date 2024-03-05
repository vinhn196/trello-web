// eslint-disable-next-line no-unused-vars
import React from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '~/assets/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Template from './Menus/Templates'
import Starred from './Menus/Starred'
import Create from './Menus/Create'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profiles'

function AppBar() {
  return (
    <Box sx={{
      backgroundColor:'#fff',
      height: (theme) => theme.trello.appBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent:'space-between'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main', fontSize:28 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color:'primary.main' }} />
          <Typography sx={{ color:'primary.main' }}>Trello</Typography>
        </Box>
        <Workspaces />
        <Recent />
        <Starred/>
        <Template />
        <Create/>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems:'center' }}>
        <TextField id="outlined-search" label="Search ..." type="search" size='small' sx={{ width:'250px', color:'primary.main' }} />
        <ModeSelect sx={{ color: 'primary.main' }} />
        <Badge color="secondary" variant="dot">
          <Tooltip title="Notifications" >
            <NotificationsNoneIcon sx={{ fontSize: 25, color:'primary.main' }} />
          </Tooltip>
        </Badge>
        <Badge color="secondary" variant="dot">
          <Tooltip title='Help'>
            <HelpOutlineIcon sx={{ color:'primary.main' }} />
          </Tooltip>
        </Badge>
        <Profile/>
      </Box>
    </Box>
  )
}

export default AppBar