import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { getDisplayGrowthRecordDate } from '@/utils/dateFormatter'
import { View } from 'react-native'
import { useGrowthDetailsContext } from '../../utils'
import {
  GrowthMeasurementTypes,
  getGrowthMeasurementTypeLabel,
  getGrowthMeasurementTypeUnit,
} from './utils'

type SingleGrowthDetailTabProps = {
  measurementType: GrowthMeasurementTypes
}

function SingleGrowthDetailTab({
  measurementType,
}: SingleGrowthDetailTabProps) {
  return (
    <View>
      <NumbersMeasurementCard measurementType={measurementType} />
    </View>
  )
}

function NumbersMeasurementCard({
  measurementType,
}: SingleGrowthDetailTabProps) {
  const { growthDetails } = useGrowthDetailsContext()

  const value = growthDetails[measurementType]
  const unit = getGrowthMeasurementTypeUnit(measurementType)
  const label = getGrowthMeasurementTypeLabel(measurementType)

  return (
    <View
      style={{
        backgroundColor: tokens.colors.neutral.white,
        padding: tokens.padding.L,
        gap: tokens.margin.L,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant={{
            size: 'paragraph',
            textStyling: {
              weight: 'bold',
            },
          }}
        >
          {label}
        </Typography>
        <Typography
          variant={{
            size: 'paragraphS',
          }}
          style={{
            color: tokens.colors.neutral.normal,
          }}
        >
          {getDisplayGrowthRecordDate({
            recordMonthIdx: growthDetails.outpostRecordMonthIdx,
            recordYear: growthDetails.outpostRecordYear,
          })}
        </Typography>
      </View>
      {value === null ? (
        <View
          style={{
            paddingVertical: tokens.padding.M,
            paddingHorizontal: tokens.padding.L,
            borderRadius: tokens.borderRadius.S,
          }}
        >
          <Typography
            variant={{
              size: 'caption',
            }}
            style={{
              textAlign: 'center',
            }}
          >
            Data {label} tidak tersedia
          </Typography>
        </View>
      ) : (
        <View
          style={{
            borderWidth: tokens.borderWidth.S,
            borderColor: tokens.colors.neutral.light,
            paddingVertical: tokens.padding.M,
            paddingHorizontal: tokens.padding.L,
            borderRadius: tokens.borderRadius.S,
          }}
        >
          <View
            style={{
              gap: tokens.margin.S,
            }}
          >
            <Typography
              variant={{
                size: 'caption',
              }}
            >
              Hasil pemeriksaan:
            </Typography>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                gap: tokens.margin.S,
              }}
            >
              <Typography
                variant={{
                  size: 'Heading4',
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
            </View>
          </View>
          {/* Main measurement result */}

          {/* KMS / Interpretation here */}
        </View>
      )}
    </View>
  )
}

export default SingleGrowthDetailTab
