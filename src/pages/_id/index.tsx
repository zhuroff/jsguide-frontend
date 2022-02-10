import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArticlesResponse } from 'types/Responses'
import ArticlesServices from 'services/ArticlesService'
import Button from 'components/button/Button'
import { Context } from 'index'

const InnerPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { store } = useContext(Context)

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
    <>
      {
        store.isAuth &&
        <div className="actions">
          <Button
            text="Редактировать"
            onClick={ () => navigate('edit', { replace: true }) }
          />

          <Button
            text="Удалить"
            onClick={ () => console.log('Удалить') }
          />
        </div>
      }

      <article className="article">
        { article !== null &&
          <>
            <h1>{ article.title }</h1>
            <div dangerouslySetInnerHTML={{__html: article.article}}></div>
          </>
        }
      </article>
    </>
  )
}

export default InnerPage
