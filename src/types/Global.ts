type AuthData = Partial<{
  login: string
  password: string
}>

type ResponseMessage = {
  message: string
}

interface UserData {
  readonly _id: string
  readonly isAdmin: boolean
  login: string
}

interface ILinks {
  readonly _id?: string
  title: string
  url: string
}

interface IDocumentBasic {
  readonly _id: string
  readonly title: string
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
