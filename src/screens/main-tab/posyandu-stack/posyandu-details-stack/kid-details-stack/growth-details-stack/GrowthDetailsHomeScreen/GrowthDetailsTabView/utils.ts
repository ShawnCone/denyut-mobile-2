import { Database } from '@/client/supabase/types'

export type GrowthMeasurementTypes = Pick<
  Database['public']['Tables']['KidBodilyGrowth']['Row'],
  'weight' | 'height' | 'headCirc' | 'armCirc'
>
