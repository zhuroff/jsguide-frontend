import { ReactNode } from 'react'
import './Article.scss'

const Article = ({ children }: { children: ReactNode }) => {
  return (
    <article className="article">
      { children }
    </article>
  )
}

export default Article
