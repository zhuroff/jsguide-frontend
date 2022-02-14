import { ILinks } from 'types/Global'
import LinkItem from './LinkItem'
import Button from 'components/button/Button'
import './LinkList.scss'

type LinkListProps = {
  links: ILinks[],
  addLink: () => void
  updateLink: (payload: Partial<ILinks>, index: number) => void
  removeLink: (index: number) => void
}

const LinkList = ({ links, addLink, updateLink, removeLink }: LinkListProps) => {
  return (
    <>
      { links?.length > 0 &&
        <ul className="article__links">
          {
            links.map((link, index) => (
              <LinkItem
                key={ index }
                item={ link }
                index={ index }
                updateLink={ updateLink }
                removeLink={ removeLink }
              />
            ))
          }
        </ul>
      }

      <Button
        text="Добавить ссылку"
        onClick={ addLink }
      />
    </>
  )
}

export default LinkList
