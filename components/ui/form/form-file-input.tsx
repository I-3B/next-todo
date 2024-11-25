import { FileInput } from '../file-input'
import { FormFieldItem, type FormFieldItemProps } from './form-field-item'

export type FormFileInputProps = {
  FileInputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof FileInput>,
    'name' | 'onChange'
  >
} &
Omit<FormFieldItemProps, 'children'>
export function FormFileInput({ FileInputProps, inputClassName, ...props }: FormFileInputProps) {
  return (
    <FormFieldItem {...props}>
      {({ onChange }) => (
        <FileInput
          className={inputClassName}
          {...FileInputProps}
          multiple={FileInputProps?.multiple}
          onChange={onChange}
        />
      )}
    </FormFieldItem>
  )
};
