import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

function BoardContent({ board }) {
  // https://docs.dndkit.com/api-documentation/sensors
  // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  const pointerSensor = useSensor(PointerSensor, { activationConstraint:{ distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint:{ distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint:{ delay: 500, tolerance: 500 } })
  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  //Cùng một thời điểm chỉ có 1 phần tử được kéo
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  // Tìm 1 column theo CardId
  const findColumnByCardId = (cardId) => {
    //Đoạn này dùng c.cards thay vì c.cardOrderIds vì ở bước handleDragOver chúng ta sẽ làm dữ liệu hoàn chỉnh cho cards trc rồi mới tạo ra cardOrderIds mới
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  //Trigger khi bắt đầu kéo 1 phần tử
  const handleDragStart = (event) => {
    console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  //Trigger trong quá trình kéo
  const handleDragOver = (event) => {

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    console.log('handleDragOver ', event)

    const { active, over } = event
    //Cần đảm bảo ko tồn tại active hoặc over(khi kéo thả ngoài container) thì ko làm gì
    if (!active || !over) return
    // activeDraggingCard: là cái card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: là cái card đang tương tác trên hoặc dưới so với card được kéo ở trên
    const { id: overCardId } = over
    // tìm 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // nếu ko tồn tại 1 trong 2 column thì ko làm gì hết , tránh crash web
    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        //Tìm vị trí index của overCard trong Column đích (nơi mà activeCard sắp được thả)
        const overCardIndex = overColumn?.cards?.findIndex(card => card?._id === overCardId)

        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
        //Clone mảng OrderedColumnState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnState mới
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id )
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
        //Column cũ
        if (nextActiveColumn) {
          //Xóa card ở cái column cũ
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //Cập nhật lại cardOrderIds cho chuẩn dữ liệu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        //Column mới
        if (nextOverColumn) {
          //Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa , có rồi thì xóa nó trc
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          //Thêm card đang kéo vào overColumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        // console.log('overColumn ', overColumn)
        // console.log('newCardIndex ', newCardIndex)
        return nextColumns
      })

    }
  }

  //Trigger khi kết thúc hàng động kéo (drag) một phần từ => hành động thả (drop)
  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('Keo tha cacd tam thoi khong thay doi gi')
    }

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
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)

  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } } ) }

  return (
    <DndContext
      //Cảm biến
      sensors={sensors}
      //Thuật toán phát hiện va chạm
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd = {handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        height: (theme) => theme.trello.boardContentHeight,
        p:'5px 0'
      }}>
        <ListColumns columns={orderedColumns} />

        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>

  )
}

export default BoardContent