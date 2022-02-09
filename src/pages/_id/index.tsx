import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ILinks } from '../../types/Global'
import { routes, api } from '../../Api'

interface IArticle {
  _id: string
  title: string
  dateCreated: string
  article: string
  links: ILinks[]
}

const InnerPage = () => {
  const location = useLocation()
  const [article, setArticle] = useState<IArticle | null>(null)

  const fetchArticle = async (url: string) => {
    try {
      const response = await api.get(url)
      
      if (response.status === 200) {
        setArticle(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchArticle(`${routes.articles}${location.pathname}`)
  }, [])

  return (
    <article className="article">
      { article !== null &&
        <>
          <h1>{ article.title }</h1>
          <div dangerouslySetInnerHTML={{__html: article.article}}></div>
        </>
      }
    </article>
  )
}

export default InnerPage
