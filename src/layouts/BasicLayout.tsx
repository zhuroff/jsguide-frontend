import { ReactNode } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
import Article from '../components/article/Article'

const BasicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="main">
      <Sidebar />
      <Header />
      <Article>{ children }</Article>
    </main>
  )
}

export default BasicLayout
