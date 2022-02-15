import { BaseSyntheticEvent, useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from 'index'
import { ILinks } from 'types/Global'
import { ArticlePage } from 'types/Article'
import Preloader from 'components/preloader/Preloader'
import Button from 'components/button/Button'
import Editor from 'components/editor/Editor'
import LinkList from 'components/links/LinkList'

const InnerPageEdit = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { user, article } = useContext(Context)

  const [isFetched, setFetchStatus] = useState(false)
  const [articleTitle, setArticleTitle] = useState<string>(article.title)
  const [articleData, setArticleData] = useState<ArticlePage>(article)

  const getAndSetArticle = async (id: string) => {
    setFetchStatus(false)
    await article.read(id)
    setFetchStatus(true)
  }

  const update = async (draftStatus: boolean | null = null) => {
    const payload = {
      ...articleData,
      title: articleTitle || articleData.title,
      isDraft: draftStatus ?? articleData.isDraft,
      links: articleData.links?.length
        ? articleData.links.map((link) => ({ title: link.title, url: link.url }))
        : []
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

  const updateArticle = (value: string) => {
    setArticleData({
      ...articleData,
      article: value
    })
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
    if (!article._id && params.id) {
      getAndSetArticle(params.id)
    } else {
      setArticleData({ ...article })
      setFetchStatus(true)
    }
  }, [])

  return (
    <>
      { !isFetched && <Preloader /> }

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
          updateEditorState={ updateArticle }
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
