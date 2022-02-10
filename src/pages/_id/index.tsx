import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticlesServices from 'services/ArticlesService'
import { ArticlesResponse } from 'types/Responses'

const InnerPage = () => {
  const params = useParams()
  const [article, setArticle] = useState<ArticlesResponse | null>(null)

  const fetchArticle = async (id: string = '')  => {
    try {
      const response = await ArticlesServices.article(id)
      
      if (response?.status === 200) {
        setArticle(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchArticle(params.id)
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
