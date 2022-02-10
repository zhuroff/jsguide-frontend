import { IDocumentBasic, ILinks, UserData } from 'types/Global'

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

interface ArticlesResponse {
  article: string
  dateCreated: string
  links: ILinks[]
  title: string
  _id: string
}

export {
  AuthResponse,
  ArticlesResponse,
  NavigationResponse
}
