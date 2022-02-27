import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { DocumentBasic } from 'types/Global'

type SidebarItemProps = {
  item: DocumentBasic
  children: ReactNode | null
}

const SidebarItem = ({ item, children }: SidebarItemProps) => {
  return (
    <li className="sidebar__nav-item">
      <NavLink
        to={ item._id }
        className='sidebar__nav-link'
      >{ item.title }</NavLink>

      { children && children }
    </li>
  )
}

export default SidebarItem
