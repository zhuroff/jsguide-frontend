import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import Button from 'components/button/Button'
import user from 'store/User'
import article from 'store/Article'

const MainPage = () => {
  const navigate = useNavigate()

  const createAndProceedArticle = async () => {
    await article.create()
    
    if (article.pageID) {
      navigate(`/${article.pageID}/edit`, { replace: true })
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
            onClick={ () => console.log('Черновики') }
          />

          <Button
            text="Опубликованные"
            onClick={ () => console.log('Опубликованные') }
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
