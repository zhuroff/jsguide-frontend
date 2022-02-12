import { useState, BaseSyntheticEvent } from 'react'
import { observer } from 'mobx-react-lite'
import { AuthData } from 'types/Global'
import Input from 'components/input/Input'
import Button from 'components/button/Button'
import user from 'store/User'

const LoginForm = () => {
  const [loginData, setLoginData] = useState<AuthData>({
    login: '',
    password: ''
  })

  const formSubmit = async (event: BaseSyntheticEvent) => {
    event.preventDefault()
    user.login(loginData)
  }

  const updateLoginData = (payload: AuthData) => {
    setLoginData({ ...loginData, ...payload })
  }

  return (
    <form onSubmit={ formSubmit }>
      <Input
        type="text"
        value={ loginData.login }
        placeholder="Login"
        onInput={ (event: BaseSyntheticEvent) => updateLoginData({ login: event.target.value }) }
      />

      <Input
        type="password"
        value={ loginData.password }
        placeholder="Password"
        onInput={ (event: BaseSyntheticEvent) => updateLoginData({ password: event.target.value }) }
      />

      <Button
        type="submit"
        text="Войти"
      />
    </form>
  )
}

export default observer(LoginForm)
