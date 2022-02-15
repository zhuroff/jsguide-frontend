import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import user from 'store/User'
import article from 'store/Article'
import sidebar from 'store/Sidebar'
import './scss/index.scss'

export const Context = createContext({ user, article, sidebar })

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={ { user, article, sidebar } }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
