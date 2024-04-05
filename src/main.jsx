// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
//cấu hình toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Cấu hình MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        allowClose: false,
        dialogProps: { maxWidth: 'xs' },
        confirmationButtonProps: { color:'primary', variant: 'outlined' },
        cancellationButtonProps: { color:'inherit' }
      }}>
        <CssBaseline/>
        <App />
        <ToastContainer position='bottom-left' theme='colored' />
      </ConfirmProvider>
    </CssVarsProvider>
  </>
)
