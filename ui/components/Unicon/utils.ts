//import { keccak256, toUtf8Bytes } from 'ethers/lib/utils'
import { keccak256, toBytes } from 'viem';
import { UNICON_COLORS } from './Colors'
import { isAddress } from '@/utilities/addresses'

export const getUniconsDeterministicHash = (address: string): bigint => {
  if (!isAddress(address)) {
    throw new Error('Invalid Ethereum address')
  }
  const hash = keccak256(toBytes(address))
  const hashNumber = BigInt('0x' + hash.slice(2, 12))
  return hashNumber
}

export const getUniconColors = (
  activeAddress: string,
  isDark: boolean,
): {
  color: string
} => {
  const hashValue = getUniconsDeterministicHash(activeAddress)
  const colorIndex = isDark ? 1 : 0

  let colorToUse
  if (!isNaN(Number(hashValue.toString()))) {
    const colorArrayIndex = Number(hashValue.toString()) % Number(UNICON_COLORS.length)
    colorToUse = UNICON_COLORS[colorArrayIndex]?.[colorIndex]
  } else {
    colorToUse = UNICON_COLORS[0]?.[colorIndex]
  }

  return {
    color: (colorToUse || '#F50DB4').toString(),
  }
}
