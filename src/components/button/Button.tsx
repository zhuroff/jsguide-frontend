import './Button.scss'

type ButtonProps = {
  text: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({ text, type = 'button' }: ButtonProps) => {
  return (
    <button
      className="button"
      type={ type }
    >
      <span className="button__text">{ text }</span>
    </button>
  )
}

export default Button
