import { usePathname, useSearchParams } from 'next/navigation'

export function useLocation() {
  const searchParams = useSearchParams().toString()
  const location = `${usePathname()}${searchParams && '?'}${searchParams}`
  return location
};
