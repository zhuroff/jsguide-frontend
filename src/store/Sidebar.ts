import { makeAutoObservable } from 'mobx'
import { IDocumentBasic, IRequestConfig } from 'types/Global'
import ArticlesServices from 'services/ArticlesServices'

class Sidebar {
  protected navigation = [] as IDocumentBasic[]
  protected requestConfig: IRequestConfig = {
    isDraft: false,
    page: 1,
    limit: 30,
    sort: { title: 1 }
  }

  constructor() {
    makeAutoObservable(this)
  }

  setNavigation = (data: IDocumentBasic[]) => {
    this.navigation = data
  }

  async read() {
    try {
      const response = await ArticlesServices.navigation(this.requestConfig)
      this.setNavigation(response?.data.docs || [])
    } catch (error) {
      console.error(error)
    }
  }

  get navbar() {
    return this.navigation
  }

  get isDraft() {
    return this.requestConfig.isDraft
  }

  setRequestConfig(config: Partial<IRequestConfig>) {
    this.requestConfig = {
      ...this.requestConfig,
      ...config
    }

    this.read()
  }
}

export default new Sidebar()
