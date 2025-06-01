import { PlatformSplitStubError } from '@/utilities/errors'
import type { JSX } from 'react'
import type { SpinningLoaderProps } from './types'

export function SpinningLoader(_props: SpinningLoaderProps): JSX.Element {
  throw new PlatformSplitStubError('SpinningLoader')
}
