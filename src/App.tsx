import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import ProtectedRoutes from 'components/ProtectedRoutes'
import BasicLayout from './layouts/BasicLayout'
import MainPage from './pages'
import InnerPage from './pages/_id'
import InnerPageEdit from './pages/_id/edit'
import user from 'store/User'

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      user.checkAuth()
    } else {
      user.setAuthChecked()
    }
  }, [])

  return (
    <BasicLayout>
      <Routes>
        <Route path="/" element={ <MainPage /> }/>
        <Route path="/:id" element={ <InnerPage /> }/>
        <Route element={ ProtectedRoutes({ isAuth: user.isAuth && user.user.isAdmin }) }>
          <Route path="/:id/edit" element={ <InnerPageEdit /> }/>
        </Route>
      </Routes>
    </BasicLayout>
  )
}

export default observer(App)
