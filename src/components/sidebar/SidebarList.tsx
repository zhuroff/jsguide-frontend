import { DocumentBasic } from 'types/Global'
import SidebarItem from './SidebarItem'

type SidebarListProps = {
  list: DocumentBasic[]
}

const SidebarList = ({ list }: SidebarListProps) => {
  return (
    <ul className="sidebar__nav-list">
      {
        list.map((item) => (
          <SidebarItem
            key={ item._id }
            item={ item }
          >
            {
              item.children.length
                ? <SidebarList list={ item.children as DocumentBasic[] } />
                : null
            }
          </SidebarItem>
        ))
      }
    </ul>
  )
}

export default SidebarList
