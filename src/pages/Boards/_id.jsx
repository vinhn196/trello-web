import Container from '@mui/material/Container'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, updateBoardDetailsAPI, createNewColumnAPI, createNewCardAPI  } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'


function Board() {
  const [board, setBoard] = useState(null)


  useEffect(() => {
    const boardId = '65fd58479a4160f07578d283'
    //Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      })
      console.log(board)
      setBoard(board)
    })
  }, [])
  //Function này có nv gọi API tạo mới column và làm lại dữ liệu state board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    //Khi tạo column mới thì nó chưa thể kéo card từ column khác sang , cần phải xử lý
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    // //cập nhật state board
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    console.log('createdCard: ', createdCard)

    //cập nhật state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }
  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    //cập nhật lại cho chuẩn sate board sau khi đã kéo thả column
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    //Gọi API update Board
    await updateBoardDetailsAPI( newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }
  return (
    <Container disableGutters maxWidth={ false } sx={{ height:'100vh' }}>
      <AppBar/>
      <BoardBar board={ board } />
      <BoardContent
        board={ board }
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        updateBoardDetailsAPI={updateBoardDetailsAPI}
      />
    </Container>
  )
}

export default Board