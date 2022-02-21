import { NavLink } from 'react-router-dom'
import './Button.scss'

type ButtonProps = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  href?: string | null
  isDisabled?: boolean
  onClick?: () => void
}

const Button = ({ text, type = 'button', href = null, isDisabled = false, onClick }: ButtonProps) => {
  return (
    <>
      { !href
        ? <button
            className="button"
            type={ type }
            disabled={ isDisabled }
            onClick={ onClick }
          >
            <span className="button__text">{ text }</span>
          </button>
        : <NavLink
            to={ href }
            className="button"
          >
            <span className="button__text">{ text }</span>
          </NavLink>
      }
    </>
  )
}

export default Button
