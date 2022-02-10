import api from '../http'
import { AxiosResponse } from 'axios'
import { ArticlesResponse, NavigationResponse } from 'types/Responses'
import { IRequestConfig } from 'types/Global'

export default abstract class ArticlesServices {
  static async navigation(config: IRequestConfig): Promise<AxiosResponse<NavigationResponse>> {
    return api.post('api/articles', config)
  }

  static async article(id: string): Promise<AxiosResponse<ArticlesResponse>> {
    return api.get<ArticlesResponse>(`api/articles/${id}`)
  }

  static async update(payload: ArticlesResponse): Promise<AxiosResponse<ArticlesResponse>> {
    return api.patch<ArticlesResponse>(`api/articles/${payload._id}`, payload)
  }
}
