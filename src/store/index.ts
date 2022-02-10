import { makeAutoObservable } from 'mobx'
import AuthService from 'services/AuthService'
import { AuthData, UserData } from 'types/Global'

export default class Store {
  user = {} as UserData
  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  setUser(user: UserData) {
    this.user = user
  }

  async login({ login = '', password = '' }: AuthData) {
    try {
      const response = await AuthService.login(login, password)
      console.log(response)

      if (response?.status === 200) {
        localStorage.setItem('token', response.data.accessToken)
        this.setAuth(true)
        this.setUser(response.data.user)
      }
    } catch (error: any) {
      console.log(error.response?.data?.message)
    }
  }

  async registration({ login = '', password = '' }: AuthData) {
    try {
      const response = await AuthService.registration(login, password)

      if (response?.status === 201) {
        console.log(response.data)
        localStorage.setItem('token', response.data.accessToken)
        this.setAuth(true)
        this.setUser(response.data.user)
      }
    } catch (error: any) {
      console.log(error.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout()
      console.log(response)

      //if (response?.status === 200) {
        localStorage.removeItem('token')
        this.setAuth(false)
        this.setUser({} as UserData )
      //}
    } catch (error: any) {
      console.log(error.response?.data?.message)
    }
  }
}