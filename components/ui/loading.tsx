import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { LoaderIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const loadingVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'min-h-4 min-w-4',
      default: 'min-h-10 min-w-10',
      lg: 'min-h-20 min-w-20',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type LoadingProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof loadingVariants>
export function Loading({ size, className, ...props }: LoadingProps) {
  return (
    <LoaderIcon
      {...props}
      className={cn(loadingVariants({ size, className }))}
    />
  )
}
