import { useCallback, useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import './Editor.scss'

type EditorProps = {
  content: string
  updateEditorState: (value: string) => void
}

const Editor = ({ content, updateEditorState }: EditorProps) => {
  const [isInit, setInitState] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link
    ],
    content: content || '',
    onUpdate({ editor }) {
      updateEditorState(editor.getHTML())
    }
  })

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) return

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()  
  }, [editor])

  useEffect(() => {
    if (editor && !isInit) {
      editor.commands.setContent(content)
      setInitState(true)
    }
  }, [content])

  return (
    <>
      { editor &&
        <div className="editor__actions">
          <button
            onClick={ () => editor.chain().focus().setParagraph().run() }
            className={ `editor__action ${editor.isActive('paragraph') ? '--active' : ''}` }
          >
            $
          </button>

          <button
            onClick={ () => editor.chain().focus().toggleBold().run() }
            className={ `editor__action ${editor.isActive('bold') ? '--active' : ''}` }
          >
            b
          </button>

          <button
            onClick={ () => editor.chain().focus().toggleItalic().run() }
            className={ `editor__action --italic ${editor.isActive('italic') ? '--active' : ''}` }
          >
            i
          </button>

          <button
            onClick={ () => editor.chain().focus().toggleHeading({ level: 2 }).run() }
            className={ `editor__action ${editor.isActive('heading', { level: 2 }) ? '--active' : ''}` }
          >
            h2
          </button>

          <button
            onClick={ () => editor.chain().focus().toggleHeading({ level: 3 }).run() }
            className={ `editor__action ${editor.isActive('heading', { level: 3 }) ? '--active' : ''}` }
          >
            h3
          </button>

          <button
            onClick={ () => editor.chain().focus().toggleBulletList().run() }
            className={ `editor__action ${editor.isActive('bulletList') ? '--active' : ''}` }
          >
            ul
          </button>

          <button
            onClick={ () => editor.chain().focus().toggleOrderedList().run() }
            className={ `editor__action ${editor.isActive('orderedList') ? '--active' : ''}` }
          >
            ol
          </button>

          <button
            onClick={ () => editor.chain().focus().toggleCodeBlock().run() }
            className={ `editor__action ${editor.isActive('codeBlock') ? '--active' : ''}` }
          >
            []
          </button>

          <button
            onClick={ () => editor.chain().focus().toggleCode().run() }
            className={ `editor__action ${editor.isActive('code') ? '--active' : ''}` }
          >
            &#8249;/&#8250;
          </button>

          <button
            onClick={ () => editor.chain().focus().toggleBlockquote().run() }
            className={ `editor__action ${editor.isActive('blockquote') ? '--active' : ''}` }
          >
            q
          </button>

          <button
            onClick={ setLink }
            className={ `editor__action ${editor.isActive('link') ? '--active' : ''}` }
          >
            a
          </button>
        </div>
      }

      <EditorContent editor={ editor } />
    </>
  )
}

export default Editor
