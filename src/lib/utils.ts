import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return new URL(path, process.env.NEXT_PUBLIC_APP_URL).toString()
}

export const formatDateTime = (date: Date | string) => {
  // new Date('2023-08-01T16:37:10.000Z') -> to two separate variables of date and time
  const [datePart] = new Date(date)
    .toISOString()
    .split('T')
    .map((part) => part.split('.')[0])

  // datePart -> 2023-08-01
  const dateParts = datePart.split('-')
  const year = dateParts[0]
  const month = dateParts[1]
  const day = dateParts[2]

  return `${day}/${month}/${year}`
}
