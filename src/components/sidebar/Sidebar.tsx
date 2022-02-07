import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { api, routes } from '../../Api'
import './Sidebar.scss'

interface IHeadings {
  _id: string
  title: string
}

const Sidebar = () => {
  const [headings, setHeadings] = useState<IHeadings[]>([])

  const [requestConfig, setRequestConfig] = useState({
    page: 1,
    limit: 30,
    sort: { title: 1 }
  })

  const fetchHeadings = async () => {
    try {
      const response = await api.post(routes.articles, requestConfig)
      
      if (response?.status === 200) {
        setHeadings(response.data.docs)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchHeadings()
  }, [])

  return (
    <aside className="sidebar">
      <NavLink
        to="/"
        className='sidebar__logo'
      >Главная</NavLink>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          { headings.length > 0 &&
            headings.map((route) => (
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

export default Sidebar
