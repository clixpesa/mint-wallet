import { PlatformSplitStubError } from '@/utilities/errors'
import type { JSX } from 'react'
import { SkeletonProps } from './types'

export function Skeleton(_props: SkeletonProps): JSX.Element {
  throw new PlatformSplitStubError('Skeleton')
}
