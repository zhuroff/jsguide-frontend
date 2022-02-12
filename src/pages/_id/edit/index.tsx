import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import ArticlesServices from 'services/ArticlesServices'
import Button from 'components/button/Button'
import Editor from 'components/editor/Editor'
import { ArticleData } from 'types/Article'
import user from 'store/User'

const InnerPageEdit = () => {
  const params = useParams()

  const [content, setContent] = useState('')
  const [title, setTitle] = useState(null)
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
          title: title || pageData.title,
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
    fetchArticle(params.id)
  }, [])

  return (
    <>
      {
        (user.isAuth && user.user.isAdmin) &&
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
        <h1
          className="article__title"
          contentEditable dangerouslySetInnerHTML={{ __html: pageData.title }}
          onInput={ (event: BaseSyntheticEvent) => setTitle(event.target.innerText) }
        />
        <Editor
          content={ content }
          updateEditorState={ (value: string) => setContent(value) }
        />
      </article>
    </>
  )
}

export default observer(InnerPageEdit)
