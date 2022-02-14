import { ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import Preloader from 'components/preloader/Preloader'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
import Section from '../components/section/Section'
import user from 'store/User'

const BasicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="main">
       { user.isAuthChecked
          ?  <>
              <Sidebar />
              <Header />
              <Section>{ children }</Section>
            </>
          : <Preloader isFullWidth />
       }
    </main>
  )
}

export default observer(BasicLayout)
