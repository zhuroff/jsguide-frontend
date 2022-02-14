type AuthData = Partial<{
  login: string
  password: string
}>

type ResponseMessage = {
  message: string
}

interface UserData {
  login: string
  _id: string
  isAdmin: boolean
}

interface ILinks {
  _id?: string
  title: string
  url: string
}

interface IDocumentBasic {
  _id: string
  title: string
}

interface IRequestConfig {
  isDraft: boolean
  page: number,
  limit: number,
  sort: { [index: string]: number }
}

export {
  ILinks,
  AuthData,
  UserData,
  IDocumentBasic,
  IRequestConfig,
  ResponseMessage
}
