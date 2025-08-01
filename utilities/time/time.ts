// TODO: use compile time macro
//import dayjs from 'dayjs'

export const SECONDS_IN_MINUTE = 60
export const MINUTES_IN_HOUR = 60
export const HOURS_IN_DAY = 24

export const ONE_SECOND_MS = 1000
export const ONE_MINUTE_MS = SECONDS_IN_MINUTE * ONE_SECOND_MS
export const ONE_HOUR_MS = MINUTES_IN_HOUR * ONE_MINUTE_MS
export const ONE_DAY_MS = HOURS_IN_DAY * ONE_HOUR_MS
export const MAX_REACT_QUERY_CACHE_TIME_MS = ONE_DAY_MS * 24

export function isStale(lastUpdated: number | null, staleTime: number): boolean {
  return !lastUpdated || Date.now() - lastUpdated > staleTime
}

export function currentTimeInSeconds(): number {
  return Math.floor(Date.now() / 1000) // in seconds
}

export function inXMinutesUnix(x: number): number {
  return Math.floor(Date.now() / 1000) + (x * 60)
}