type AuthData = Partial<{
  login: string
  password: string
}>

interface UserData {
  login: string
  _id: string
  isAdmin: boolean
}

interface ILinks {
  title: string
  url: string
}

interface IDocumentBasic {
  _id: string
  title: string
}

interface IRequestConfig {
  page: number,
  limit: number,
  sort: { [index: string]: number }
}

export {
  ILinks,
  AuthData,
  UserData,
  IDocumentBasic,
  IRequestConfig
}
