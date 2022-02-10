import { useContext, useState, BaseSyntheticEvent } from 'react'
import { AuthData } from '../../types/Global'
// import { api } from '../../Api'
import { Context } from 'index'
import Input from 'components/input/Input'
import Button from 'components/button/Button'

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

  const formSubmit = async (event: any) => {
    event.preventDefault()

    const { login, password, passwordConfirm } = registerData

    if (passwordConfirm !== password) {
      return alert('Пароли не совпадают!')
    }

    store.registration({ login, password })

    // try {
    //   const response = await api.post('/api/user/registration', { login, password })
    //   console.log(response)
    // } catch (error) {
    //   throw error
    // }
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

export default RegistrationForm
