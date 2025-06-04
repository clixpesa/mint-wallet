import { PlatformSplitStubError } from '@/utilities/errors'
import type { JSX } from 'react'
import type { ShineProps } from './types'

export function Shine(_props: ShineProps): JSX.Element {
  throw new PlatformSplitStubError('Shine')
}
