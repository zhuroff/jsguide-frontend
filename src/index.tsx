import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { State } from 'types/Global'
import Store from 'store'
import App from './App'
import './scss/index.scss'

const store = new Store()

export const Context = createContext<State>({
  store
})

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={ { store } }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
