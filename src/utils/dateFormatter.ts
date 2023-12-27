import {
  differenceInMonths,
  differenceInYears,
  format,
  setDefaultOptions,
} from 'date-fns'
import { id } from 'date-fns/locale'
setDefaultOptions({ locale: id })

export function getDisplayDate(date: Date | string) {
  return format(date, 'dd MMMM yyyy')
}

export function getDisplayCurrentAge(date: Date | string) {
  const years = differenceInYears(new Date(), date)
  const months = differenceInMonths(new Date(), date) % 12
  return `${years} Tahun ${months} Bulan`
}

export function getDisplayBodyRecordDate({
  recordYear,
  recordMonthIdx,
}: {
  recordYear: number
  recordMonthIdx: number
}) {
  const date = new Date(recordYear, recordMonthIdx)
  return format(date, 'MMMM yyyy')
}

export const MONTHS_LIST_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
]

export const MONTHS_LIST_LONG = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'Nopember',
  'Desember',
]
