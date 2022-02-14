import { ILinks } from 'types/Global'

type ArticlePage = {
  _id: string
  title: string
  article: string
  isDraft: boolean
  links: ILinks[]
}

export {
  ArticlePage
}
