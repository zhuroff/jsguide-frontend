import { api } from 'Api'
import { useState } from 'react'
import { UserData } from 'types/Global'
import Input from 'components/input/Input'
import Button from 'components/button/Button'

const LoginForm = () => {
  const [loginData, setLoginData] = useState<UserData>({
    login: '',
    password: ''
  })

  const login = async (event: any) => {
    event.preventDefault()

    try {
      const response = await api.post('/api/user/login', loginData)
      console.log(response)
    } catch (error) {
      throw error
    }
  }

  const updateLoginData = (payload: UserData) => {
    setLoginData({ ...loginData, ...payload })
  }

  return (
    <form onSubmit={ login }>
      <Input
        type="text"
        placeholder="Login"
        onInput={ (event: any) => updateLoginData({ login: event.target.value }) }
      />

      <Input
        type="password"
        placeholder="Password"
        onInput={ (event: any) => updateLoginData({ password: event.target.value }) }
      />

      <Button
        type="submit"
        text="Войти"
      />
    </form>
  )
}

export default LoginForm
