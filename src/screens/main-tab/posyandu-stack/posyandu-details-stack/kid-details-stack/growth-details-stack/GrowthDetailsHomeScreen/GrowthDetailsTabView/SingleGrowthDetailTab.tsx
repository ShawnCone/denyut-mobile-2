import Divider from '@/design-system/Divider'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import {
  getDisplayDate,
  getDisplayGrowthRecordDate,
} from '@/utils/dateFormatter'
import { View } from 'react-native'
import { useGrowthDetailsContext } from '../../utils'
import SingleSeverityPill from './SingleSeverityPill'
import {
  GrowthMeasurementTypes,
  getGrowthMeasurementTypeLabel,
  getGrowthMeasurementTypeUnit,
  getInterpretationSource,
  getSeverityStyle,
  useGrowthInterpretation,
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
      {/* Measurement card content */}
      <NumbersMeasurementCardContent
        value={value}
        unit={unit}
        label={label}
        measurementType={measurementType}
      />
    </View>
  )
}

function EmptyValueMeasurementCardContent({ label }: { label: string }) {
  return (
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
  )
}

function NumbersMeasurementCardContent({
  value,
  unit,
  measurementType,
  label,
}: {
  value: number | null
  unit: string
  label: string
  measurementType: GrowthMeasurementTypes
}) {
  const {
    data: interpretationData,
    isPending,
    isError,
    refetch,
  } = useGrowthInterpretation(measurementType)

  if (isPending)
    return (
      <View
        style={{
          paddingVertical: tokens.padding.L,
        }}
      >
        <LoadingIndicator />
      </View>
    )

  if (isError)
    return (
      <View
        style={{
          paddingVertical: tokens.padding.L,
        }}
      >
        <ErrorIndicator
          message="Tidak bisa memuat hasil pemeriksaan anak"
          onRetry={refetch}
        />
      </View>
    )

  if (
    interpretationData === null ||
    typeof interpretationData === 'undefined' ||
    value === null
  )
    return <EmptyValueMeasurementCardContent label={label} />

  const previousMeasurementData = interpretationData.previousMeasurementData

  const increaseSincePrevious = previousMeasurementData
    ? value - previousMeasurementData.measurementValue
    : null

  return (
    <View
      style={{
        borderWidth: tokens.borderWidth.S,
        borderColor: tokens.colors.neutral.light,
        paddingTop: tokens.padding.L,
        paddingBottom: tokens.padding.M,
        paddingHorizontal: tokens.padding.L,
        borderRadius: tokens.borderRadius.S,
        gap: tokens.margin.M,
      }}
    >
      {/* Result and severity row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            gap: tokens.margin.S,
          }}
        >
          <Typography
            variant={{
              size: 'captionS',
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
        <View
          style={{
            gap: tokens.margin.S,
          }}
        >
          <Typography
            variant={{
              size: 'captionS',
            }}
          >
            Hasil interpretasi {getInterpretationSource(measurementType)}:{' '}
          </Typography>
          <SingleSeverityPill
            severity={interpretationData.severity}
            label={interpretationData.label}
          />
        </View>
      </View>
      {increaseSincePrevious !== null && !!previousMeasurementData && (
        <>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: tokens.margin.S,
            }}
          >
            <Typography
              variant={{
                size: 'paragraphS',
                textStyling: {
                  weight: 'bold',
                },
              }}
              style={{
                color: getSeverityStyle(interpretationData.severity).color,
              }}
            >
              {increaseSincePrevious > 0 && '+'}
              {increaseSincePrevious} {unit}
            </Typography>
            <Typography
              variant={{
                size: 'caption',
              }}
            >
              dari
            </Typography>
            <Typography
              variant={{
                size: 'caption',
                textStyling: {
                  weight: 'bold',
                },
              }}
            >
              {previousMeasurementData.measurementValue}
            </Typography>
            <Typography
              variant={{
                size: 'caption',
              }}
            >
              {unit}
            </Typography>
            <Typography
              variant={{
                size: 'caption',
              }}
            >
              (Data: {getDisplayDate(previousMeasurementData.measurementDate)})
            </Typography>
          </View>
        </>
      )}
    </View>
  )
}

export default SingleGrowthDetailTab
