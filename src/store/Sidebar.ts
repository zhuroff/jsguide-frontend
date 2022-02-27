import { makeAutoObservable } from 'mobx'
import { DocumentBasic, RequestConfig } from 'types/Global'
import ArticlesServices from 'services/ArticlesServices'

class Sidebar {
  protected navigation = [] as DocumentBasic[]
  protected requestConfig: RequestConfig = {
    isDraft: false,
    page: 1,
    limit: 30,
    sort: { title: 1 }
  }

  constructor() {
    makeAutoObservable(this)
  }

  async read() {
    try {
      const response = await ArticlesServices.navigation(this.requestConfig)
      this.setNavigation(response?.data.docs || [])
    } catch (error) {
      console.error(error)
    }
  }

  setNavigation = (data: DocumentBasic[]) => {
    this.navigation = this.navigationTree(data)
  }

  navigationTree(data: DocumentBasic[]) {
    const children: DocumentBasic[] = []
    const parents: DocumentBasic[] = []

    return data.reduce<DocumentBasic[]>((acc, next) => {
      next.parent ? children.push(next) : acc.push(next)

      if (next.children.length) {
        parents.push(next)
        next.children = [
          ...children.filter((child) => (
            child.parent === next._id
          ))
        ]
      }

      parents.forEach((parent) => {
        if (parent._id === next.parent) {
          parent.children = [...parent.children, next]
        }
      })

      return acc
    }, [])
  }

  get navbar() {
    return this.navigation
  }

  get isDraft() {
    return this.requestConfig.isDraft
  }

  setRequestConfig(config: Partial<RequestConfig>) {
    this.requestConfig = {
      ...this.requestConfig,
      ...config
    }

    this.read()
  }
}

export default new Sidebar()
