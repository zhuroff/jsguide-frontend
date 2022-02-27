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

type DocumentItem = {
  readonly _id: string
  readonly title: string
}

type DocumentBasic = DocumentItem & {  
  readonly parent: string | null
  children: (string | DocumentBasic)[]
}

type RequestConfig = {
  isDraft: boolean
  page: number,
  limit: number,
  sort: { [index: string]: number }
}

export {
  ILinks,
  AuthData,
  UserData,
  DocumentItem,
  DocumentBasic,
  RequestConfig,
  ResponseMessage
}
