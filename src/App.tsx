import { Routes, Route } from 'react-router-dom'
import BasicLayout from './layouts/BasicLayout'
import MainPage from './pages'
import InnerPage from './pages/_id'

const App = () => {
  return (
    <BasicLayout>
      <Routes>
        <Route path="/" element={ <MainPage /> }/>
        <Route path="/:id" element={ <InnerPage /> }/>
      </Routes>
    </BasicLayout>
  )
}

export default App
