import { PlatformSplitStubError } from '@/utilities/errors'
import { SwitchProps } from './types'

export function Switch(_props: SwitchProps): JSX.Element {
  throw new PlatformSplitStubError('Switch')
}
