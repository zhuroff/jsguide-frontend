import { ArticlePage } from 'types/Article'
import { ILinks } from 'types/Global'

export default class ArticleDTO implements ArticlePage {
  _id: string
  title: string
  article: string
  isDraft: boolean
  links: ILinks[]

  constructor(data: ArticlePage) {
    this._id = data._id
    this.title = data.title
    this.article = data.article
    this.isDraft = data.isDraft
    this.links = data.links
  }
}
