import { useEffect, useContext } from 'react'
import { Context } from 'index'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import './Sidebar.scss'

const Sidebar = () => {
  const { sidebar } = useContext(Context)

  useEffect(() => { sidebar.read() }, [])

  return (
    <aside className="sidebar">
      <NavLink
        to="/"
        className='sidebar__logo'
      >JSGuide</NavLink>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          { sidebar.navbar.length > 0 &&
            sidebar.navbar.map((route) => (
              <li
                key={ route._id }
                className="sidebar__nav-item"
              >
                <NavLink
                  to={ route._id }
                  className='sidebar__nav-link'
                >{ route.title }</NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
    </aside>
  )
}

export default observer(Sidebar)
