import React, { useEffect, useRef } from 'react'

function Editor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    editorRef.current = {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    }
  }, [])

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData()
            onChange(data)
          }}
        />
      ) : (
        <div>Carregando editor</div>
      )}
    </div>
  )
}

export default Editor
