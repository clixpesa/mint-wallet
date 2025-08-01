import { getConfig } from 'tamagui'
import { lineHeightFallbacks } from '../constants'

export const getLineHeightForButtonFontTokenKey = (size: '$xs' | '$sm' | '$md' | '$lg'): number => {
  try {
    const { fontsParsed } = getConfig()

    const maybeTamaguiVariable = fontsParsed?.$button?.lineHeight?.[size]

    if (typeof maybeTamaguiVariable === 'number') {
      return maybeTamaguiVariable
    }

    if (typeof maybeTamaguiVariable?.val === 'number') {
      return maybeTamaguiVariable.val
    }

    throw new Error(`[getLineHeightForButtonFontTokenKey] Cannot get lineHeight for size: '${size}'`)
  } catch {
    return lineHeightFallbacks[size]
  }
}
