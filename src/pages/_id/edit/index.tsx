import { Context } from 'index'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArticlesServices from 'services/ArticlesServices'
import Button from 'components/button/Button'
import Editor from 'components/editor/Editor'
import { ArticleData } from 'types/Article'
import { observer } from 'mobx-react-lite'

const InnerPageEdit = () => {
  const navigate = useNavigate()
  const params = useParams()

  const { store } = useContext(Context)

  const [content, setContent] = useState('')
  const [pageData, setPageData] = useState<ArticleData>({
    title: '',
    links: []
  })

  const fetchArticle = async (id: string = '')  => {
    try {
      const response = await ArticlesServices.article(id)
      
      if (response?.status === 200) {
        setContent(response.data.article)
        setPageData({
          title: response.data.title,
          links: response.data.links
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const update = async () => {
    try {
      const response = await ArticlesServices.update(
        params.id || '',
        {
          title: pageData.title,
          links: pageData.links,
          article: content
        }
      )

      console.log(response)
    } catch (error) {
      console.error(error)
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
        (store.isAuth && store.user.isAdmin) &&
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
        <h1 contentEditable dangerouslySetInnerHTML={{ __html: pageData.title }}></h1>
        <Editor
          content={ content }
          updateEditorState={ (value: string) => setContent(value) }
        />
      </article>
    </>
  )
}

export default observer(InnerPageEdit)
