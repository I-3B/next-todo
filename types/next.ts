import type { ReactNode } from 'react'

export interface PageProps<
  TParams extends object = object,
  TSeach extends object = Record<string, string | string[] | undefined>,
> {
  params: TParams
  searchParams: TSeach
}
export interface LayoutProps<TParams extends object = object> {
  params: TParams
  children: ReactNode
}
