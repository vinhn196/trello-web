
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
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  borderRadius: '2px',
  '.MuiSvgIcon-root': {
    color:'white'
  },
  '&:hover': {
    bgcolor:'primary.50'
  }
}
function BoardBar({ board }) {
  return (
    <Box sx={{
      // backgroundColor: 'primary.dark',
      height: (theme) => theme.trello.boardBarHeight,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      overflowX: 'auto',
      '&::-webkit-scrollbar-track': { m:1 },
      // borderTop: '1px solid #00bfa5',
      paddingX: 2,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE }
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
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
        <Button
          startIcon={<PersonAddIcon />}
          variant='outlined'
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover':{ borderColor:'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={5}
          total={10}
          sx={{
            gap:'10px',
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor:'#a4b0be' }
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