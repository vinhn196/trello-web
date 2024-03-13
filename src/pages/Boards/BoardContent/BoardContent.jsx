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
  pointerWithin,
  // rectIntersection,
  closestCorners,
  // closestCenter,
  getFirstCollision
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState ,useCallback, useRef } from 'react'
import { cloneDeep, intersection, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

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
  // Cùng một thời điểm chỉ có 1 phần tử được kéo
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  // Điểm va chạm cuối cùng
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  // Tìm 1 column theo CardId
  const findColumnByCardId = (cardId) => {
    //Đoạn này dùng c.cards thay vì c.cardOrderIds vì ở bước handleDragOver chúng ta sẽ làm dữ liệu hoàn chỉnh cho cards trc rồi mới tạo ra cardOrderIds mới
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  //Funding chung xử lý cập nhật lại state trong trường hợp di chuyển card giữa các column
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
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
        //Thêm placeholdercard khi column rỗng
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        //Cập nhật lại cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      //Column mới
      if (nextOverColumn) {
        //Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa , có rồi thì xóa nó trc
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        //Thêm card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        //Xóa placeholdercard khi column có card
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)


        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      // console.log('overColumn ', overColumn)
      // console.log('newCardIndex ', newCardIndex)
      return nextColumns
    })
  }

  //Trigger khi bắt đầu kéo 1 phần tử
  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    //Nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }
  //Trigger trong quá trình kéo
  const handleDragOver = (event) => {

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // console.log('handleDragOver ', event)

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
    //Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData)
    }
  }

  //Trigger khi kết thúc hàng động kéo (drag) một phần từ => hành động thả (drop)
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)

    const { active, over } = event
    // Kiếm trả nếu ko tồn tại active , over thì return luôn tránh lỗi
    if (!active || !over) return
    //Xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard: là cái card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overCard: là cái card đang tương tác trên hoặc dưới so với card được kéo ở trên
      const { id: overCardId } = over
      // tìm 2 column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      // nếu ko tồn tại 1 trong 2 column thì ko làm gì hết , tránh crash web
      if (!activeColumn || !overColumn) return

      //Hành động kéo thả card giữa 2 column khác nhau
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData)

      } else {
        //Hành động kéo thả card trong cùng 1 Column

        // Lấy vị trí cũ từ thằng oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex( c => c._id === activeDragItemId )
        // Lấy vị trí mới từ thằng over
        const newCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          //Clone mảng OrderedColumnState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnState mới
          const nextColumns = cloneDeep(prevColumns)
          //Tìm tới column đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          //Cập nhật lại 2 giá trị mới của card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          //Trả vể vị trí state mới chuẩn vị trí
          return nextColumns
        })
      }
    }

    //Xử lý kéo thả column trong 1 boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      //Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
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

    //Những dữ liệu sau khi kéo thả luôn phải đưa về giá trị ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)

  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }
  //Custom lại thuật toán phát hiện va chạm
  const collisionDetectionStrategy = useCallback((args) => {
    // console.log(collisionDetectionStrategy)
    //Trường hợp kéo column thì dùng closestCorners là chuẩn nhất
    if (activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    //Tìm các điểm giao nhau , va chạm với con trỏ , trả về 1 mảng va chạm
    const pointerInterSections = pointerWithin(args)
    // console.log('pointerInterSections', pointerInterSections)
    //Fix bug flickering của thư viện dnd-kit
    if (!pointerInterSections?.length) return
    // //Thuật toán phát hiện va chạm sẽ trả về 1 mảng va chạm ở đây (không cần bước này nữa)
    // const interSections = pointerInterSections?.length > 0 ? pointerInterSections : rectIntersection(args)
    //Tìm overId đầu tiên trong interSection trên
    let overId = getFirstCollision(pointerInterSections, 'id')
    if (overId) {
      //
      const checkColumn = orderedColumns.find(c => c._id === overId)
      if (checkColumn) {
        // console.log('overId before', overId)
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers
            .filter(container => {
              return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
            })
        })[0]?.id
        // console.log('overId after', overId)
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }

    //Nếu overId là null thì trả về mảng rỗng tránh crash web
    return lastOverId.current ? [{ id:lastOverId.current }] : []
  }, [activeDragItemType])


  return (
    <DndContext
      //Cảm biến
      sensors={sensors}
      //Thuật toán phát hiện va chạm
      //Nếu chỉ dùng closestCorners sẽ có bug flickering và sai lệch dữ liệu
      // collisionDetection={closestCorners}

      //Custom nâng cao thuật toán phát hiện va chạm
      collisionDetection={collisionDetectionStrategy}
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