import { DocumentItem, ILinks } from 'types/Global'

type ArticlePage = {
  readonly _id: string
  title: string
  article: string
  isDraft: boolean
  links: ILinks[]
  parent: DocumentItem | null
  children: DocumentItem[]
}

export {
  ArticlePage
}
