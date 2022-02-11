import { useCallback, BaseSyntheticEvent, useState } from 'react'
import Input from '../input/Input'
import LoginForm from 'components/forms/LoginForm'
import RegistrationForm from 'components/forms/RegistrationForm'
import debounce from '../../shared/debounce'
import './Header.scss'
import FloatModal from 'components/modals/FloatModal'

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
    if (value === 'login') {
      setRegisterFormState(false)
      setLoginFormState(true)
    } else if (value === 'register') {
      setLoginFormState(false)
      setRegisterFormState(true)
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

export default Header
