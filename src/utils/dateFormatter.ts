import {
  differenceInMonths,
  differenceInYears,
  format,
  setDefaultOptions,
} from 'date-fns'
import { id } from 'date-fns/locale'
setDefaultOptions({ locale: id })

export function getDisplayDate(date: Date) {
  return format(date, 'dd MMMM yyyy')
}

export function getDisplayCurrentAge(date: Date) {
  const years = differenceInYears(new Date(), date)
  const months = differenceInMonths(new Date(), date) % 12
  return `${years} Tahun ${months} Bulan`
}
