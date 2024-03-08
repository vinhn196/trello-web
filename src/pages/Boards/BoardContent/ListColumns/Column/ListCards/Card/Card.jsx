import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard} from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p:1.5 } }}>
          <Typography> Card 01 </Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://media.baoquangninh.vn/dataimages/201904/original/images1283642_2.jpg"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p:1.5 } }}>
        <Typography> Ha Long Bay </Typography>
      </CardContent>
      <CardActions sx={{ p:'0 4px 8px 2px' }}>
        <Button size="small" startIcon={<GroupIcon/>}>10</Button>
        <Button size="small" startIcon={<CommentIcon/>}>20</Button>
        <Button size="small" startIcon={<AttachmentIcon/>}>30</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card