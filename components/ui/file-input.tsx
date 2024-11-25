import type { File } from 'node:buffer'
import { type ComponentPropsWithoutRef, useId, useRef, useState } from 'react'

export type FileInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'multiple' | 'onChange' | 'value'>
  & ({
    multiple: true
    onChange?: (e: FileList | null) => void
  } |
  {
    multiple?: false
    onChange?: (e: File | null) => void
  })
export function FileInput({ ...props }: FileInputProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<FileList | null>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files)
    if (props.multiple) {
      props.onChange?.(e.target.files)
    }
    else {
      const file = (e.target.files?.[0] || null) as File | null
      props.onChange?.(file)
    }
  }

  return (
    <>
      <label
        title={files ? Array.from(files).map(file => file.name).join('\n') : ''}
        tabIndex={0}
        htmlFor={id}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            inputRef.current?.click()
          }
        }}
      >
        <div className="me-1 flex h-fit min-w-max items-center justify-center rounded-sm bg-foreground/20 px-3 py-1 text-foreground">Choose File</div>
        {files && <span className="truncate">{ Array.from(files).map(file => file.name).join(', ')}</span>}
        {!files && (
          <span className="max-w-min truncate">
            {/* remove prefix ex: image/png => .png */}
            {props.accept?.split(', ').map(a => a.replaceAll(/.+\/([a-z0-9]+)$/gi, '.$1')).join(', ')}
          </span>
        )}
      </label>
      <input ref={inputRef} hidden {...props} type="file" id={id} onChange={handleChange} />
    </>
  )
};
