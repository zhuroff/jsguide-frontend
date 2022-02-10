import { UserData } from 'types/Global'

interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: UserData
}

export {
  AuthResponse
}
