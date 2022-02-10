import Store from 'store'

type AuthData = Partial<{
  login: string
  password: string
}>

interface UserData {
  login: string
  _id: string
}

interface State {
  store: Store
}

interface ILinks {
  title: string
  url: string
}

export {
  ILinks,
  AuthData,
  UserData,
  State
}
