import { BaseSyntheticEvent } from 'react'
import { ILinks } from 'types/Global'
import Input from 'components/input/Input'

type LinkItemProps = {
  item: ILinks
  index: number
  updateLink: (payload: Partial<ILinks>, index: number) => void
  removeLink: (index: number) => void
}

const LinkItem = ({ item, index, updateLink, removeLink }: LinkItemProps) => {
  return (
    <li className="article__links-item">
      <Input
        type="text"
        placeholder="Название"
        value={ item.title }
        onInput={ (event: BaseSyntheticEvent) => {
          updateLink({ title: event.target.value }, index) }
        }
      />

      <Input
        type="text"
        placeholder="URL"
        value={ item.url }
        onInput={ (event: BaseSyntheticEvent) => {
          updateLink({ url: event.target.value }, index) }
        }
      />

      <button
        className="article__links-del"
        onClick={ () => removeLink(index) }
      >&times;</button>
    </li>
  )
}

export default LinkItem
