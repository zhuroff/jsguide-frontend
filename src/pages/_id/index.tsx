import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Preloader from 'components/preloader/Preloader'
import Button from 'components/button/Button'
import user from 'store/User'
import article from 'store/Article'

const InnerPage = () => {
  const params = useParams()

  const [isFetched, setFetchStatus] = useState(false)

  const fetchArticle = async (id: string) => {
    setFetchStatus(false)
    await article.read(id)
    setFetchStatus(true)
  }

  useEffect(() => {
    if (params.id) fetchArticle(params.id)
  }, [params.id])

  return (
    <>
      { !isFetched && <Preloader /> }
      {
        (user.isAuth && user.user.isAdmin) &&
        <div className="actions">
          <Button
            text="Редактировать"
            href="edit"
          />
        </div>
      }

      <article className="article">
        { article.pageID !== undefined &&
          <>
            <h1 className="article__title">{ article.pageData.title }</h1>
            <div dangerouslySetInnerHTML={{__html: article.pageData.article}}></div>
          </>
        }
      </article>
    </>
  )
}

export default observer(InnerPage)
