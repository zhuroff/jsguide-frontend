import { useState } from 'react'
import { UserData } from '../../types/Global'
import { api } from '../../Api'

type RegisterData = UserData & Partial<{
  passwordConfirm: string
}>

const RegistrationForm = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    login: '',
    password: '',
    passwordConfirm: ''
  })

  const register = async (event: any) => {
    event.preventDefault()

    const { login, password, passwordConfirm } = registerData

    if (passwordConfirm !== password) {
      return alert('Пароли не совпадают!')
    }

    try {
      const response = await api.post('/api/user/registration', { login, password })
      console.log(response)
    } catch (error) {
      throw error
    }
  }

  const setRegData = (payload: RegisterData) => {
    setRegisterData({ ...registerData, ...payload })
  }

  return (
    <form onSubmit={ register }>
      <input type="text" placeholder="login" onInput={ (event: any) => setRegData({ login: event.target.value }) } />
      <input type="password" placeholder="password" onInput={ (event: any) => setRegData({ password: event.target.value }) } />
      <input type="password" placeholder="Confirm password" onInput={ (event: any) => setRegData({ passwordConfirm: event.target.value }) } />
      <button type="submit">Send</button>
    </form>
  )
}

export default RegistrationForm
