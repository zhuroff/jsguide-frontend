import { useContext, useState, BaseSyntheticEvent } from 'react'
import { AuthData } from '../../types/Global'
import { Context } from 'index'
import Input from 'components/input/Input'
import Button from 'components/button/Button'
import { observer } from 'mobx-react-lite'

type RegisterData = AuthData & Partial<{
  passwordConfirm: string
}>

const RegistrationForm = () => {
  const { store } = useContext(Context)

  const [registerData, setRegisterData] = useState<RegisterData>({
    login: '',
    password: '',
    passwordConfirm: ''
  })

  const formSubmit = async (event: BaseSyntheticEvent) => {
    event.preventDefault()

    const { login, password, passwordConfirm } = registerData

    if (passwordConfirm !== password) {
      return alert('Пароли не совпадают!')
    }

    store.registration({ login, password })
  }

  const updateRegistrationData = (payload: RegisterData) => {
    setRegisterData({ ...registerData, ...payload })
  }

  return (
    <form onSubmit={ formSubmit }>
      <Input
        type="text"
        value={ registerData.login }
        placeholder="Login"
        onInput={ (event: BaseSyntheticEvent) => updateRegistrationData({ login: event.target.value }) }
      />

      <Input
        type="password"
        value={ registerData.password }
        placeholder="Password"
        onInput={ (event: BaseSyntheticEvent) => updateRegistrationData({ password: event.target.value }) }
      />

      <Input
        type="password"
        value={ registerData.passwordConfirm }
        placeholder="Confirm password"
        onInput={ (event: BaseSyntheticEvent) => updateRegistrationData({ passwordConfirm: event.target.value }) }
      />

      <Button
        type="submit"
        text="Зарегистрироваться"
      />
    </form>
  )
}

export default observer(RegistrationForm)
