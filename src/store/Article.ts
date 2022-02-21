import { makeAutoObservable } from 'mobx'
import { ArticlePage } from 'types/Article'
import { ILinks } from 'types/Global'
import ArticlesServices from 'services/ArticlesServices'
import sidebar from 'store/Sidebar'

class Article {
  _id: string = ''
  title: string = ''
  article: string = ''
  isDraft: boolean = false
  links: ILinks[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setArticlePage = (data: ArticlePage) => {
    const { _id, title, article, isDraft, links } = data
    // this.articlePage = data || {}
    this._id = _id
    this.title = title
    this.article = article
    this.isDraft = isDraft
    this.links = links
  }

  async create() {
    try {
      const response = await ArticlesServices.create()
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

  async remove(id: string) {
    try {
      const response = await ArticlesServices.remove(id)
      sidebar.read()
      return response?.data
    } catch (error) {
      console.error(error)
    }
  }

  get pageData() {
    return //this.articlePage
  }
}

export default new Article()
