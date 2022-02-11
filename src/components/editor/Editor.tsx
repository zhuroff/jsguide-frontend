import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type EditorProps = {
  content: string
  updateEditorState: (value: string) => void
}

const Editor = ({ content, updateEditorState }: EditorProps) => {
  const [isInit, setInitState] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content || '',
    onUpdate({ editor }) {
      updateEditorState(editor.getHTML())
    }
  })

  useEffect(() => {
    if (editor && !isInit) {
      editor.commands.setContent(content)
      setInitState(true)
    }
  }, [content])

  return (
    <EditorContent editor={ editor } />
  )
}

export default Editor
