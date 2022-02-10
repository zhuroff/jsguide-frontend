import { Context } from 'index'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArticlesResponse } from 'types/Responses'
import ArticlesServices from 'services/ArticlesService'
import Button from 'components/button/Button'

const InnerPageEdit = () => {
  const navigate = useNavigate()
  const params = useParams()
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

  const update = async () => {
    if (article) {
      try {
        const response = await ArticlesServices.update(article)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (!store.isAuth && params.id) {
      navigate(`/${params.id}`, { replace: true })
    } else {
      fetchArticle(params.id)
    }
  }, [])

  return (
    <>
      {
        store.isAuth &&
        <div className="actions">
          <Button
            text="Сохранить"
            onClick={ update }
          />

          <Button
            text="Отмена"
            href={ `/${params.id}` }
          />
        </div>
      }

      <article className="article">
        { article !== null &&
          <>
            <h1 contentEditable dangerouslySetInnerHTML={{__html: article.title}}></h1>
            <div contentEditable dangerouslySetInnerHTML={{__html: article.article}}></div>
          </>
        }
      </article>
    </>
  )
}

export default InnerPageEdit
