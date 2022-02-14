import { makeAutoObservable } from 'mobx'
import { ArticlePage } from 'types/Article'
import ArticlesServices from 'services/ArticlesServices'
import sidebar from 'store/Sidebar'

class Article {
  protected articlePage = {} as ArticlePage

  constructor() {
    makeAutoObservable(this)
  }

  setArticlePage = (data: ArticlePage) => {
    this.articlePage = data || {}
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
      const response = await ArticlesServices.read(id)
      this.setArticlePage(response?.data)
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

  get pageID() {
    return this.articlePage._id
  }

  get pageData() {
    return this.articlePage
  }
}

export default new Article()
