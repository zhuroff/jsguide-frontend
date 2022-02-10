import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ArticlesServices from 'services/ArticlesService'
import { IDocumentBasic, IRequestConfig } from 'types/Global'
import './Sidebar.scss'

const Sidebar = () => {
  const [headings, setHeadings] = useState<IDocumentBasic[]>([])

  const [requestConfig, setRequestConfig] = useState<IRequestConfig>({
    page: 1,
    limit: 30,
    sort: { title: 1 }
  })

  const fetchHeadings = async (config: IRequestConfig) => {
    try {
      const response = await ArticlesServices.navigation(config)

      if (response?.status === 200) {
        setHeadings(response.data.docs)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchHeadings(requestConfig)
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
