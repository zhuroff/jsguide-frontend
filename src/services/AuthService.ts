import api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from 'types/Responses'

export default abstract class AuthService {
  static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('api/user/login', { login, password })
  }

  static async registration(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('api/user/registration', { login, password })
  }

  static async logout(): Promise<AxiosResponse> {
    return api.post('api/user/logout')
  }
}