import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from 'index'

import Button from 'components/button/Button'

const MainPage = () => {
  const navigate = useNavigate()
  const { user, sidebar, article } = useContext(Context)

  const createAndProceedArticle = async () => {
    await article.create()
    
    if (article._id) {
      navigate(`/${article._id}/edit`, { replace: true })
    }
  }

  return (
    <>
      {
        (user.isAuth && user.user.isAdmin) &&
        <div className="actions">
          <Button
            text="Новая статья"
            onClick={ createAndProceedArticle }
          />

          <Button
            text="Черновики"
            isDisabled={ sidebar.isDraft }
            onClick={ () => sidebar.setRequestConfig({ isDraft: true }) }
          />

          <Button
            text="Опубликованные"
            isDisabled={ !sidebar.isDraft }
            onClick={ () => sidebar.setRequestConfig({ isDraft: false }) }
          />
        </div>
      }

      <article className="article">
        <h1>Main page</h1>
      </article>
    </>
  )
}

export default observer(MainPage)
