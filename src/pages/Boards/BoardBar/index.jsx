
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLE = {
  color: 'primary.main',
  bgcolor: '#fff',
  borderRadius: '2px',
  '& .MuiSvgIcon-root': {
    color:'primary.main'
  },
  '&:hover': {
    bgcolor:'primary.50'
  }
}
function BoardBar() {
  return (
    <Box sx={{
      // backgroundColor: 'primary.dark',
      height: (theme) => theme.trello.boardBarHeight,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      overflowX: 'auto',
      borderTop: '1px solid #00bfa5',
      paddingX: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE }
          icon={<DashboardIcon />}
          label="vinhnguyendev board"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button startIcon={<PersonAddIcon/>} variant='outlined'>Invite</Button>
        <AvatarGroup
          max={5}
          total={10}
          sx={{
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px'
            }
          }}>
          <Tooltip title='vinhnguyen'>
            <Avatar alt='vinhnguyen' src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png"/>
          </Tooltip>
          <Tooltip title='vinhnguyen'>
            <Avatar alt='vinhnguyen' src="https://cdn-icons-png.flaticon.com/512/2810/2810658.png"/>
          </Tooltip>
          <Tooltip title='vinhnguyen'>
            <Avatar alt='vinhnguyen' src="https://cdn-icons-png.flaticon.com/512/147/147142.png"/>
          </Tooltip>
          <Tooltip title='vinhnguyen'>
            <Avatar alt='vinhnguyen' src="https://cdn-icons-png.flaticon.com/512/2810/2810754.png"/>
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar