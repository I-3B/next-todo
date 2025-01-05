import type { ReactNode } from "react";

export interface PageProps<
  TParams extends Promise<
    Record<string, string | string[] | undefined>
  > = Promise<Record<string, string | string[] | undefined>>,
  TSearch extends Promise<
    Record<string, string | string[] | undefined>
  > = Promise<Record<string, string | string[] | undefined>>,
> {
  params: TParams;
  searchParams: TSearch;
}
export interface LayoutProps<
  TParams extends Promise<
    Record<string, string | string[] | undefined>
  > = Promise<Record<string, string | string[] | undefined>>,
> {
  params: TParams;
  children: ReactNode;
}
