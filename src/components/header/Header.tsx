import { useCallback, BaseSyntheticEvent } from 'react'
import Input from '../input/Input'
import debounce from '../../shared/debounce'
import './Header.scss'

const Header = () => {
  const showLoginForm = () => {
    console.log('Login')
  }

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
      showLoginForm()
    } else {
      sendQueryRequest(value)
    }
  }
  
  const debouncedHandler = useCallback(debounce(searchQuerySplitter, 1000), [])

  return (
    <header className="header">
      <Input
        type="text"
        placeholder="search"
        onInput={ (event: BaseSyntheticEvent) => debouncedHandler(event.target.value) }
      />
    </header>
  )
}

export default Header
