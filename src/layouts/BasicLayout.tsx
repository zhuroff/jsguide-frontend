import { ReactNode } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
import Section from '../components/section/Section'

const BasicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="main">
      <Sidebar />
      <Header />
      <Section>{ children }</Section>
    </main>
  )
}

export default BasicLayout
