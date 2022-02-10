import './Button.scss'

type ButtonProps = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const Button = ({ text, type = 'button', onClick }: ButtonProps) => {
  return (
    <button
      className="button"
      type={ type }
      onClick={ onClick }
    >
      <span className="button__text">{ text }</span>
    </button>
  )
}

export default Button
