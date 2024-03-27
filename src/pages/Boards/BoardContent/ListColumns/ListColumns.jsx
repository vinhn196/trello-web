// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Button from '@mui/material/Button'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { set } from 'lodash'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

function ListColumns({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Please enter Column Title!')
      return
    }
    console.log(newColumnTitle)
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  const handleClose = () => {
    setOpenNewColumnForm(false)
  }
  return (
    <SortableContext items={columns.map( c => c._id )} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m:2 }
      }}>
        {columns?.map(column => <Column key={column._id} column={column} />)}
        {/* Box Add new column CTA */}
        { !openNewColumnForm
          ? <Box sx={{
            color: 'white',
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}
          onClick={toggleOpenNewColumnForm}
          onClose={handleClose}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 2.1
              }}
            >
            Add new Column
            </Button>
          </Box>
          : <Box
            sx={{
              minWidth:'250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap:1
            }}
            onClose={handleClose}>
            <TextField
              label="Enter column title"
              type="text"
              size='small'
              variant='outlined'
              autoFocus
              data-no-dnd= "true"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
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
              // value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value) }
            />
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Button
                onClick={addNewColumn }
                variant='contained' color='success' size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover':{ bgcolor: (theme) => theme.palette.success.main }
                }}
              >Add Column
              </Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover':{ color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }

      </Box>
    </SortableContext>
  )
}

export default ListColumns