import type { useForm } from 'react-hook-form'

export function formName<TForm extends ReturnType<typeof useForm<any, any, any>>>(name: Parameters<TForm['setValue']>[0]) {
  return name
}
