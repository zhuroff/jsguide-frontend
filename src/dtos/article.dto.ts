import { ArticlePage } from 'types/Article'
import { DocumentItem, ILinks } from 'types/Global'

export default class ArticleDTO implements ArticlePage {
  _id = ''
  title = ''
  article = ''
  isDraft = false
  links = [] as ILinks[]
  parent = null as DocumentItem | null
  children = [] as DocumentItem[]

  constructor(data: ArticlePage) {
    this._id = data._id
    this.title = data.title
    this.article = data.article
    this.isDraft = data.isDraft
    this.links = data.links
    this.parent = data.parent
    this.children = data.children
  }
}
