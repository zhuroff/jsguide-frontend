import { NavLink } from 'react-router-dom'
import './Button.scss'

type ButtonProps = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  href?: string | null
  onClick?: () => void
}

const Button = ({ text, type = 'button', href = null, onClick }: ButtonProps) => {
  return (
    <>
      { !href
        ? <button
            className="button"
            type={ type }
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
