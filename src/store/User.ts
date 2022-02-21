import { makeAutoObservable } from 'mobx'
import { AuthData, UserData } from 'types/Global'
import { AuthResponse } from 'types/Responses'
import AuthService from 'services/AuthService'
import axios from 'axios'

class User {
  user = {} as UserData
  isAuth = false
  isAuthChecked = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  setUser(user: UserData) {
    this.user = user
  }

  setAuthChecked() {
    this.isAuthChecked = true
  }

  async login({ login = '', password = '' }: AuthData) {
    try {
      const response = await AuthService.login(login, password)

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

      if (response?.status === 200) {
        localStorage.removeItem('token')
        this.setAuth(false)
        this.setUser({} as UserData )
      }
    } catch (error: any) {
      console.log(error.response?.data?.message)
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(
        `${process.env['REACT_APP_SERVER_HOST']}/api/user/refresh`,
        { withCredentials: true }
      )

      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
      this.setAuthChecked()
    } catch (error: any) {
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setAuthChecked()
    }
  }
}

export default new User()
