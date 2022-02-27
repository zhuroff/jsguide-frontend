import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from 'index'
import Preloader from 'components/preloader/Preloader'
import Button from 'components/button/Button'
import { NavLink } from 'react-router-dom'

const InnerPage = () => {
  const params = useParams()
  const { article, user } = useContext(Context)

  const [isFetched, setFetchStatus] = useState(false)

  const fetchArticle = (id: string) => {
    setFetchStatus(false)
    article.read(id)
      .then(_ => setFetchStatus(true))
      .catch((ignore) => ignore)
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
        <h1 className="article__title">{ article.title }</h1>

        {
          article.children.length > 0 &&
          <div className="article__children">
            <div className="article__children-title">Оглавление</div>
            <ul className="article__children-list">
              {
                article.children.map((article) => (
                  <li
                    key={ article._id }
                    className="article__children-item"
                  >
                    <NavLink
                      to={ `/${article._id}` }
                      className="article__children-link"
                    >{ article.title }</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
        }

        <div className="ProseMirror" dangerouslySetInnerHTML={{__html: article.article}}></div>

        { article.links.length > 0 &&
          <footer className="article__footer">
            <div className="article__footer-heading">Ссылки по теме:</div>
            <ul className="article__footer-links">
              {
                article.links.map((link) => (
                  <li
                    key={ link._id }
                    className="article__footer-item"
                  >
                    <a
                      href={ link.url }
                      className="article__footer-link"
                      target="_blank"
                    >{ link.title }</a>
                  </li>
                ))
              }
            </ul>
          </footer>
        }
      </article>
    </>
  )
}

export default observer(InnerPage)
