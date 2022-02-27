import { makeAutoObservable } from 'mobx'
import { ArticlePage } from 'types/Article'
import { DocumentItem, ILinks } from 'types/Global'
import ArticlesServices from 'services/ArticlesServices'
import sidebar from 'store/Sidebar'
import ArticleDTO from 'dtos/article.dto'

class Article implements ArticleDTO {
  _id = ''
  title = ''
  article = ''
  isDraft = false
  links = [] as ILinks[]
  parent = null as DocumentItem | null
  children = [] as DocumentItem[]

  constructor() {
    makeAutoObservable(this)
  }

  setArticlePage = (data: ArticlePage) => {
    const { _id, title, article, isDraft, links, parent, children } = data

    this._id = _id
    this.title = title
    this.article = article
    this.isDraft = isDraft
    this.links = links
    this.parent = parent
    this.children = children
  }

  async create(parent: null | string = null) {
    try {
      const response = await ArticlesServices.create(parent)
      this.setArticlePage(response?.data)
    } catch (error) {
      console.error(error)
    }
  }

  async read(id: string) {
    try {
      const data = await ArticlesServices.read(id)
      this.setArticlePage(data)
    } catch (error) {
      console.error(error)
    }
  }

  async update(payload: ArticlePage) {
    try {
      const response = await ArticlesServices.update(payload)
      sidebar.read()
      return response?.data
    } catch (error) {
      console.error(error)
    }
  }

  async addSubPage(id: string) {
    await this.create(id)
    return new Article()
  }

  async remove(id: string) {
    try {
      const response = await ArticlesServices.remove(id)
      sidebar.read()
      return response?.data
    } catch (error) {
      console.error(error)
    }
  }

  get articleData() {
    return {
      _id: this._id,
      title: this.title,
      article: this.article,
      isDraft: this.isDraft,
      links: this.links
    }
  }
}

export default new Article()
