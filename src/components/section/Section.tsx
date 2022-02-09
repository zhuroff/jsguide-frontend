import { ReactNode } from 'react'
import './Section.scss'

const Section = ({ children }: { children: ReactNode }) => {
  return (
    <section className="section">
      { children }
    </section>
  )
}

export default Section
