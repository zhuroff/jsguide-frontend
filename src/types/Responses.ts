import { IDocumentBasic, ILinks, UserData } from 'types/Global'
import { ArticleData, ArticleContent } from './Article'

interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: UserData
}

interface NavigationResponse {
  limit: number
  page: number
  totalDocs: number
  totalPages: number
  docs: IDocumentBasic[]
}

interface ArticlesResponse extends ArticleData, ArticleContent {
  dateCreated: string
  _id: string
}

export {
  AuthResponse,
  ArticlesResponse,
  NavigationResponse
}
