import { revalidatePath } from './next-cache'

export function revalidateCurrentPath() {
  revalidatePath(window.location.pathname)
}
