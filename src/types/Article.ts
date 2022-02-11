import { ILinks } from "./Global";

interface ArticleData {
  title: string
  links: ILinks[]
}

interface ArticleContent {
  article: string
}

export {
  ArticleData,
  ArticleContent
}
