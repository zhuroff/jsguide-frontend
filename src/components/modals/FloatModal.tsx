import { ReactNode } from 'react'
import './FloatModal.scss'

type FloatModalProps = Partial<{
  children: ReactNode
}>

const FloatModal = ({ children }: FloatModalProps) => {
  return (
    <div className="float-modal">
      { children }
    </div>
  )
}

export default FloatModal
