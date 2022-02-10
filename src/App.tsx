import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import BasicLayout from './layouts/BasicLayout'
import MainPage from './pages'
import InnerPage from './pages/_id'
import InnerPageEdit from './pages/_id/edit'

const App = () => {
  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  return (
    <BasicLayout>
      <Routes>
        <Route path="/" element={ <MainPage /> }/>
        <Route path="/:id" element={ <InnerPage /> }/>
        <Route path="/:id/edit" element={ <InnerPageEdit /> }/>
      </Routes>
    </BasicLayout>
  )
}

export default observer(App)
