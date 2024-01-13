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
import {
  GrowthMeasurementTypes,
  getGrowthMeasurementTypeLabel,
  useGrowthDetailsContext,
} from '../../utils'
import EmptyValueMeasurementCardContent from './EmptyValueCardContent'
import GrowthInterpretationCard from './GrowthInterpretationCard'
import SingleSeverityPill from './SingleSeverityPill'
import {
  getGrowthMeasurementTypeUnit,
  getInterpretationSource,
  getSeverityStyle,
  useGrowthInterpretation,
} from './utils'

type NumbersMeasurementCardProps = { measurementType: GrowthMeasurementTypes }

function NumbersMeasurementCard({
  measurementType,
}: NumbersMeasurementCardProps) {
  const { growthDetails } = useGrowthDetailsContext()

  const value = growthDetails[measurementType]
  const unit = getGrowthMeasurementTypeUnit(measurementType)
  const label = getGrowthMeasurementTypeLabel(measurementType)

  return (
    <GrowthInterpretationCard
      mainTitle={label}
      rightSideTitle={getDisplayGrowthRecordDate({
        recordMonthIdx: growthDetails.outpostRecordMonthIdx,
        recordYear: growthDetails.outpostRecordYear,
      })}
    >
      <NumbersMeasurementCardContent
        value={value}
        unit={unit}
        label={label}
        measurementType={measurementType}
      />
    </GrowthInterpretationCard>
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
    return <EmptyValueMeasurementCardContent measurementName={label} />

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
        paddingBottom: increaseSincePrevious
          ? tokens.padding.M
          : tokens.padding.L,
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

export default NumbersMeasurementCard
