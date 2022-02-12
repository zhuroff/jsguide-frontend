import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import user from 'store/User'
import './scss/index.scss'

export const Context = createContext({ user })

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={ { user } }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
