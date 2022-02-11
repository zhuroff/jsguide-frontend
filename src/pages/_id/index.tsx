import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ArticlesResponse } from 'types/Responses'
import ArticlesServices from 'services/ArticlesServices'
import Button from 'components/button/Button'
import { Context } from 'index'
import { observer } from 'mobx-react-lite'

const InnerPage = () => {
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

  useEffect(() => {
    fetchArticle(params.id)
  }, [])

  return (
    <>
      {
        (store.isAuth && store.user.isAdmin) &&
        <div className="actions">
          <Button
            text="Редактировать"
            href="edit"
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

export default observer(InnerPage)
