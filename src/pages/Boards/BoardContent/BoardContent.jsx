import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

function BoardContent({ board }) {
  // https://docs.dndkit.com/api-documentation/sensors
  // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  const pointerSensor = useSensor(PointerSensor, { activationConstraint:{ distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint:{ distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint:{ delay: 500, tolerance: 500 } })
  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)
    const { active, over } = event
    // Kiếm trả nếu ko tồn tại over thì return luôn tránh lỗi
    if (!over) return

    if (active.id != over.id) {
      // Lấy vị trí cũ từ thằng active
      const oldIndex = orderedColumns.findIndex( c => c._id === active.id )
      // Lấy vị trí mới từ thằng over
      const newIndex = orderedColumns.findIndex( c => c._id === over.id )
      // Dùng arrayMove để sắp xếp lại column ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // Phần này để sau dùng xử lý API :
      // const dndOrderedColumnsIds = dndOrderedColumns.map( c => c._id )
      // console.log(dndOrderedColumns)
      // console.log(dndOrderedColumnsIds)

      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors = { sensors }>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        height: (theme) => theme.trello.boardContentHeight,
        p:'5px 0'
      }}>
        <ListColumns columns={ orderedColumns } />
      </Box>
    </DndContext>

  )
}

export default BoardContent