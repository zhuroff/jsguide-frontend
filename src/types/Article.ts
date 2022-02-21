import { ILinks } from 'types/Global'

type ArticlePage = {
  readonly _id: string
  title: string
  article: string
  isDraft: boolean
  links: ILinks[]
}

export {
  ArticlePage
}
