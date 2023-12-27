import { useKidInfoContext } from '@/context/KidInfoContext'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import Typography from '@/design-system/Typography'
import {
  SingleFormFieldContainerWithinRow,
  SingleRowFieldContainer,
} from '@/design-system/forms/FormLayout'
import { tokens } from '@/design-system/tokens/tokens'
import { getDisplayGrowthRecordDate } from '@/utils/dateFormatter'
import { View } from 'react-native'
import { useGetLatestGrowthRecordQuery } from './utils'

function LatestGrowthRecordCard() {
  const { kidInfo } = useKidInfoContext()

  const { data, isPending, isError } = useGetLatestGrowthRecordQuery({
    kidId: kidInfo.id,
  })

  if (isPending) return <LoadingIndicator size={tokens.iconSize.M} />

  if (isError) {
    return (
      <ErrorIndicator message="Tidak bisa memuat riwayat pertumbuhan sebelumnya" />
    )
  }

  const dataIsPresent = data !== null

  return (
    <View
      style={{
        gap: tokens.margin.L,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant={{
            size: 'caption',
            textStyling: {
              weight: 'bold',
            },
          }}
        >
          Pertumbuhan Sebelumnya
        </Typography>
        {dataIsPresent && (
          <Typography
            variant={{
              size: 'caption',
            }}
            style={{
              color: tokens.colors.neutral.normal,
            }}
          >
            {getDisplayGrowthRecordDate({
              recordYear: data.outpostRecordYear,
              recordMonthIdx: data.outpostRecordMonthIdx,
            })}
          </Typography>
        )}
      </View>
      <View
        style={{
          gap: tokens.margin.M,
        }}
      >
        {dataIsPresent ? (
          <>
            <SingleRowFieldContainer>
              <SingleMeasurementEntry
                label="Berat badan"
                value={data.weight}
                unit="kg"
              />
              <SingleMeasurementEntry
                label="Tinggi badan"
                value={data.height}
                unit="cm"
              />
            </SingleRowFieldContainer>
            <SingleRowFieldContainer>
              <SingleMeasurementEntry
                label="Lingkar Kepala"
                value={data.headCirc}
                unit="cm"
              />
              <SingleMeasurementEntry
                label="Lingkar Lengan"
                value={data.armCirc}
                unit="cm"
              />
            </SingleRowFieldContainer>
          </>
        ) : (
          <Typography
            variant={{
              size: 'captionS',
            }}
            style={{
              textAlign: 'center',
            }}
          >
            Belum ada riwayat pertumbuhan sebelumnya
          </Typography>
        )}
      </View>
    </View>
  )
}

function SingleMeasurementEntry({
  label,
  value,
  unit,
}: {
  label: string
  value: number | null
  unit: string
}) {
  const valueIsPresent = value !== null

  return (
    <SingleFormFieldContainerWithinRow>
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: tokens.padding.L,
          paddingVertical: tokens.padding.M,
          borderWidth: tokens.borderWidth.S,
          borderColor: tokens.colors.neutral.light,
          borderRadius: tokens.borderRadius.S,
        }}
      >
        <>
          <Typography
            variant={{
              size: 'captionS',
            }}
          >
            {label}
          </Typography>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: tokens.margin.S,
            }}
          >
            {valueIsPresent ? (
              <>
                <Typography
                  style={{
                    color: tokens.colors.primary.normal,
                  }}
                  variant={{
                    size: 'paragraph',
                    textStyling: {
                      weight: 'bold',
                    },
                  }}
                >
                  {value}
                </Typography>
                <Typography
                  variant={{
                    size: 'caption',
                  }}
                >
                  {unit}
                </Typography>
              </>
            ) : (
              <Typography
                variant={{
                  size: 'paragraph',
                }}
                style={{
                  color: tokens.colors.neutral.normal,
                }}
              >
                Tidak Tersedia
              </Typography>
            )}
          </View>
        </>
      </View>
    </SingleFormFieldContainerWithinRow>
  )
}

export default LatestGrowthRecordCard
