import { LayoutAnimation } from 'react-native'
import { LayoutAnimationOptions } from './types'

const DEFAULT_OPTIONS: Required<LayoutAnimationOptions> = {
  preset: 'easeInEaseOut',
  shouldSkip: false,
}

export function easeInEaseOutLayoutAnimation(options?: LayoutAnimationOptions): void {
  const mergedOptions = options ? { ...DEFAULT_OPTIONS, ...options } : DEFAULT_OPTIONS

  if (mergedOptions?.shouldSkip) {
    return
  }

  LayoutAnimation.configureNext(LayoutAnimation.Presets[mergedOptions.preset])
}