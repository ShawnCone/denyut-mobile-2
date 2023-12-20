import { PosyanduInfo } from '@/client/supabase/queries/posyandu-info'

export function formatPosyanduInfoLocation(posyanduInfo: PosyanduInfo) {
  return `${posyanduInfo.rw ? `RW ${posyanduInfo.rw},` : ''} ${
    posyanduInfo.kelurahan ? `${posyanduInfo.kelurahan},` : ''
  } ${posyanduInfo.kecamatan ? `${posyanduInfo.kecamatan},` : ''} ${
    posyanduInfo.city
  }, ${posyanduInfo.province}`
}
