// import { api } from 'Api'
import { useState, FC, BaseSyntheticEvent, useContext } from 'react'
import { AuthData } from 'types/Global'
import Input from 'components/input/Input'
import Button from 'components/button/Button'
import { Context } from 'index'
import { observer } from 'mobx-react-lite'

const LoginForm: FC = () => {
  const { store } = useContext(Context)

  const [loginData, setLoginData] = useState<AuthData>({
    login: '',
    password: ''
  })

  const formSubmit = async (event: any) => {
    event.preventDefault()

    // try {
    //   const response = await api.post('/api/user/login', loginData)
    //   console.log(response)
    // } catch (error) {
    //   throw error
    // }
    store.login(loginData)
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
