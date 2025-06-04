import { PlatformSplitStubError } from '@/utilities/errors'
import type { JSX } from 'react'

export function PulseRipple(_props: { rippleColor?: string }): JSX.Element | null {
  throw new PlatformSplitStubError('PulseRipple')
}
