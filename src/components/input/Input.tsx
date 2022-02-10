import './Input.scss'

type InputProps = {
  type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'radio'
  placeholder?: string
  onInput: (event: any) => void
}

const Input = ({ type, placeholder, onInput }: InputProps) => {
  return (
    <div className="input">
      {
        (type !== 'checkbox' && type !== 'radio') &&
        <>
          <input
            type={ type }
            placeholder={ placeholder && placeholder }
            onInput={ onInput }
            className="input__text"
            spellCheck="false"
          />
        </>
      }
    </div>
  )
}

export default Input
