import { NavLink } from 'react-router-dom'
import './Button.scss'

type ButtonProps = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  category?: 'danger' | 'warning' | 'default'
  href?: string | null
  isDisabled?: boolean
  onClick?: () => void
}

const Button = ({
  text,
  type = 'button',
  category = 'default',
  href = null,
  isDisabled = false,
  onClick }: ButtonProps
) => {
  return (
    <>
      { !href
        ? <button
            className={ `button --${category}` }
            type={ type }
            disabled={ isDisabled }
            onClick={ onClick }
          >
            <span className="button__text">{ text }</span>
          </button>
        : <NavLink
            to={ href }
            className={ `button --${category}` }
          >
            <span className="button__text">{ text }</span>
          </NavLink>
      }
    </>
  )
}

export default Button
