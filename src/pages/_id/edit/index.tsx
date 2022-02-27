import { BaseSyntheticEvent, useEffect, useState, useContext, useReducer } from 'react'
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
  const [preRemoving, setPreRemoving] = useState(false)
  // const [articleTitle, setArticleTitle] = useState<string>('')
  const [articleData, setArticleData] = useReducer(
    (articleData: ArticlePage, payload: Partial<ArticlePage>) => ({ ...articleData, ...payload }),
    {} as ArticlePage
  )

  const getAndSetArticle = async (id: string) => {
    setFetchStatus(false)
    await article.read(id)
    setArticleData(article.articleData)
    setFetchStatus(true)
  }

  const getArticlePayload = (draftStatus: boolean | null) => {
    return {
      ...articleData,
      isDraft: draftStatus ?? articleData.isDraft,
      links: articleData.links?.length
        ? articleData.links.map((link) => ({ title: link.title, url: link.url }))
        : []
    }
  }

  const update = async (draftStatus: boolean | null = null) => {
    article.update(getArticlePayload(draftStatus))
      .then((result) => console.log(result))
      .catch((ignore) => ignore)
  }

  const addSubPage = async () => {
    setFetchStatus(false)
    await article.addSubPage(String(params.id))
    navigate(`/${article._id}/edit`, { replace: true })
    setArticleData(article.articleData)
    setFetchStatus(true)
  }

  const remove = () => {
    article.remove(articleData._id)
      .then((result) => {
        console.log(result)
        navigate('/', { replace: true })
      })
      .catch((ignore) => ignore)
  }

  const changeDraftState = (payload: { isDraft: boolean }) => {
    setArticleData(payload)
    update(payload.isDraft)
  }

  const updateArticle = (value: string) => {
    setArticleData({ article: value })
  }

  const addLink = () => {
    setArticleData({
      links: [...articleData.links, { title: '', url: '' }]
    })
  }

  const updateLink = (payload: Partial<ILinks>, index: number) => {
    setArticleData({
      links: articleData.links.map((link, i) => (
        i === index ? { ...link, ...payload } : link
      ))
    })
  }

  const removeLink = (index: number) => {
    setArticleData({
      links: articleData.links.filter((_, i) => index !== i)
    })
  }

  useEffect(() => {
    if (!article._id && params.id) {
      getAndSetArticle(params.id)
    } else {
      setArticleData(article)
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
            text="+ Подстраница"
            onClick={ addSubPage }
          />
          
          {
            !preRemoving
              ? <Button
                  text="Удалить"
                  onClick={ () => setPreRemoving(true) }
                />
              : <Button
                  category="danger"
                  text="Подтвердить удаление"
                  onClick={ remove }
                />
          }

          {
            !preRemoving
              ? <Button
                  text="Отмена"
                  href={ `/${params.id}` }
                />
              : <Button
                  category="warning"
                  text="Отмена"
                  onClick={ () => setPreRemoving(false) }
                />
          }
        </div>
      }

      { isFetched &&
        <article className="article">
          <textarea
            rows={ 1 }
            className="article__title"
            defaultValue={ articleData.title }
            onInput={ (event: BaseSyntheticEvent) => setArticleData({ title: event.target.value }) }
          ></textarea>
          
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
      }
    </>
  )
}

export default observer(InnerPageEdit)
