import { useCallback, BaseSyntheticEvent, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Input from 'components/input/Input'
import LoginForm from 'components/forms/LoginForm'
import RegistrationForm from 'components/forms/RegistrationForm'
import debounce from 'shared/debounce'
import FloatModal from 'components/modals/FloatModal'
import user from 'store/User'
import './Header.scss'

const Header = () => {
  const [isLoginForm, setLoginFormState] = useState(false)
  const [isRegisterForm, setRegisterFormState] = useState(false)

  const sendQueryRequest = async (value: string) => {
    try {
      if (value.length) {
        console.log(value)
      }
    } catch (error) {
      throw error
    }
  }

  const searchQuerySplitter = (value: string) => {
    if (value === process.env.REACT_APP_SLOG) {
      setRegisterFormState(false)
      setLoginFormState(true)
    } else if (value ===  process.env.REACT_APP_SREG) {
      setLoginFormState(false)
      setRegisterFormState(true)
    } else if (value === process.env.REACT_APP_SOUT) {
      user.logout()
    } else {
      setLoginFormState(false)
      setRegisterFormState(false)
      sendQueryRequest(value)
    }
  }
  
  const debouncedHandler = useCallback(debounce(searchQuerySplitter, 1000), [])

  return (
    <header className="header">
      <div className="header__search">
        <Input
          type="text"
          placeholder="Search"
          onInput={ (event: BaseSyntheticEvent) => debouncedHandler(event.target.value) }
        />

        { isLoginForm &&
          <FloatModal>
            <LoginForm />
          </FloatModal>
        }

        { isRegisterForm &&
          <FloatModal>
            <RegistrationForm />
          </FloatModal>
        }
      </div>
    </header>
  )
}

export default observer(Header)
