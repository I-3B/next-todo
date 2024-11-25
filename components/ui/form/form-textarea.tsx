import * as React from 'react'

import { Textarea } from '../textarea'
import type { FormFieldItemProps } from './form-field-item'
import { FormFieldItem } from './form-field-item'
import { cn } from '@/lib/utils'

export type FormTextareaProps<C extends { [k: string]: any } = any> = {
  TextAreaProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Textarea>,
    'name'
  >
} &
Omit<FormFieldItemProps<C>, 'children'>
& Pick<
  React.ComponentPropsWithoutRef<typeof Textarea>,
  'placeholder'
>

const FormTextarea = React.forwardRef<HTMLDivElement, FormTextareaProps>(
  (
    {
      className,
      inputClassName,
      TextAreaProps,
      placeholder,
      ...props
    },
    ref,
  ) => {
    return (
      <FormFieldItem
        {...props}
        ref={ref}
      >
        {field => <Textarea {...field} {...{ placeholder }} {...TextAreaProps} className={cn(inputClassName, TextAreaProps?.className)} />}
      </FormFieldItem>
    )
  },
)
FormTextarea.displayName = 'FormTextarea'

export { FormTextarea }
