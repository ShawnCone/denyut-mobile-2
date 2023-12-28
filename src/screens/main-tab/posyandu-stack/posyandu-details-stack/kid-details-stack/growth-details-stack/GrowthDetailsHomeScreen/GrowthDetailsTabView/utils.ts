import { Database } from '@/client/supabase/types'

export type GrowthMeasurementTypes = keyof Pick<
  Database['public']['Tables']['KidBodilyGrowth']['Row'],
  'weight' | 'height' | 'headCirc' | 'armCirc'
>

export const PAGER_VIEW_NAMES: GrowthMeasurementTypes[] = [
  'weight',
  'height',
  'headCirc',
  'armCirc',
]

export function getGrowthMeasurementTypeLabel(
  inValue: GrowthMeasurementTypes,
): string {
  switch (inValue) {
    case 'weight':
      return 'Berat Badan'
    case 'height':
      return 'Tinggi Badan'
    case 'headCirc':
      return 'Lingkar Kepala'
    case 'armCirc':
      return 'Lingkar Lengan'
  }
}

export function getGrowthMeasurementTypeUnit(
  inValue: GrowthMeasurementTypes,
): string {
  switch (inValue) {
    case 'weight':
      return 'kg'
    case 'height':
      return 'cm'
    case 'headCirc':
      return 'cm'
    case 'armCirc':
      return 'cm'
  }
}
