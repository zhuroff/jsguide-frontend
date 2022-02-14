import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ILinks } from 'types/Global'
import { ArticlePage } from 'types/Article'
import Button from 'components/button/Button'
import Editor from 'components/editor/Editor'
import LinkList from 'components/links/LinkList'
import user from 'store/User'
import article from 'store/Article'

const InnerPageEdit = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [articleTitle, setArticleTitle] = useState(null)
  const [articleData, setArticleData] = useState<ArticlePage>({} as ArticlePage)

  const getAndSetArticle = async (id: string) => {
    await article.read(id)
    setArticleData({ ...article.pageData })
  }

  const update = async (draftStatus: boolean | null = null) => {
    const payload = {
      ...articleData,
      title: articleTitle || articleData.title,
      isDraft: draftStatus ?? articleData.isDraft,
      links: articleData.links.map((link) => ({ title: link.title, url: link.url }))
    }

    const result = await article.update(payload)

    if (result) {
      console.log(result.message)
    }
  }

  const remove = async () => {
    const result = await article.remove(articleData._id)

    if (result) {
      console.log(result.message)
      navigate('/', { replace: true })
    }
  }

  const changeDraftState = (payload: { isDraft: boolean }) => {
    setArticleData({ ...articleData, ...payload })
    update(payload.isDraft)
  }

  const addLink = () => {
    const payload: ILinks = { title: '', url: '' }

    setArticleData({
      ...articleData,
      links: [...articleData.links, payload]
    })
  }

  const updateLink = (payload: Partial<ILinks>, index: number) => {
    setArticleData({
      ...articleData,
      links: articleData.links.map((link, i) => (
        i === index ? { ...link, ...payload } : link
      ))
    })
  }

  const removeLink = (index: number) => {
    setArticleData({
      ...articleData,
      links: articleData.links.filter((_, i) => index !== i)
    })
  }

  useEffect(() => {
    if (!article.pageID && params.id) {
      getAndSetArticle(params.id)
    } else {
      setArticleData({ ...article.pageData })
    }
  }, [])

  return (
    <>
      {
        (user.isAuth && user.user.isAdmin) &&
        <div className="actions">
          <Button
            text="Сохранить"
            onClick={ () => update() }
          />

          {
            articleData.isDraft
              ? <Button
                  text="Опубликовать"
                  onClick={ () => changeDraftState({ isDraft: false }) }
                />
              : <Button
                  text="В черновики"
                  onClick={ () => changeDraftState({ isDraft: true }) }
                />
          }

          <Button
            text="Удалить"
            onClick={ remove }
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
          contentEditable dangerouslySetInnerHTML={{ __html: articleData.title }}
          onInput={ (event: BaseSyntheticEvent) => setArticleTitle(event.target.innerText) }
        />
        
        <Editor
          content={ articleData.article }
          updateEditorState={ (value: string) => setArticleData({
            ...articleData,
            article: value
          }) }
        />

        <LinkList
          links={ articleData.links }
          addLink={ addLink }
          updateLink={ updateLink }
          removeLink={ removeLink }
        />
      </article>
    </>
  )
}

export default observer(InnerPageEdit)
