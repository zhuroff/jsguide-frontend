import { ReactComponent as IconPreloader } from './preloader.svg'
import './Preloader.scss'

type PreloaderProps = {
  isFullWidth?: boolean
}

const Preloader = ({ isFullWidth }: PreloaderProps) => (
  <div className={ `preloader ${isFullWidth ? '--fullwidth' : ''}` }>
    < IconPreloader />
  </div>
)

export default Preloader
