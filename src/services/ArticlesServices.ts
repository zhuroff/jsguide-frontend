import api from '../http'
import { AxiosResponse } from 'axios'
import { NavigationResponse } from 'types/Responses'
import { RequestConfig, ResponseMessage } from 'types/Global'
import { ArticlePage } from 'types/Article'
import ArticleDTO from 'dtos/article.dto'

export default class ArticlesServices {
  static async navigation(config: RequestConfig): Promise<AxiosResponse<NavigationResponse>> {
    return api.post('api/articles', config)
  }

  static async create(id: null | string): Promise<AxiosResponse<ArticlePage>> {
    return api.post('api/articles/create', { id })
  }

  static async read(id: string): Promise<ArticleDTO> {
    const response = await api.get<ArticlePage>(`api/articles/${id}`)

    if (response?.status === 200) {
      return new ArticleDTO(response.data)
    }

    throw 'Failed'
  }

  static async update(payload: ArticlePage): Promise<AxiosResponse<ResponseMessage>> {
    return api.patch<ResponseMessage>(`api/articles/${payload._id}`, payload)
  }

  static async remove(id: string): Promise<AxiosResponse<ResponseMessage>> {
    return api.delete<ResponseMessage>(`api/articles/${id}`)
  }
}
