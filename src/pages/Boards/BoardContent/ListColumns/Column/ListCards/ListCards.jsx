import Box from '@mui/material/Box'
import Card from './Card/Card'
function ListCards({ cards }) {

  // const [anchorEl, setAnchorEl] = React.useState(null)
  // const open = Boolean(anchorEl)
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }
  // const handleClose = () => {
  //   setAnchorEl(null)
  // }
  return (
    <>

      <Box sx={{
        p: '0 5px',
        m:'0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(
          ${theme.trello.boardContentHeight} - 
          ${theme.spacing(5)} -
          ${theme.trello.columnFooterHeight} -
          ${theme.trello.columnHeaderHeight}
          )`,
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
      }}>
        {cards?.map(card => <Card key={card._id} card={card} />)}
      </Box >
    </>
  )
}

export default ListCards