interface ILinks {
  title: string
  url: string
}

type UserData = Partial<{
  login: string
  password: string
}>

export {
  ILinks,
  UserData
}
