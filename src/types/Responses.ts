import { IDocumentBasic, UserData } from 'types/Global'

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

export {
  AuthResponse,
  NavigationResponse
}
