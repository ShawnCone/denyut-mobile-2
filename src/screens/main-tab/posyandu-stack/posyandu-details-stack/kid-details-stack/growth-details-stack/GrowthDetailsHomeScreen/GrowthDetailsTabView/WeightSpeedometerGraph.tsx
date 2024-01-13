import { GrowthInterpretationSeverity } from '@/client/denyut-posyandu-be/__generated__/graphql'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from 'react-native'
import { Circle, Svg } from 'react-native-svg'
import { getSeverityStyle } from './utils'

const CIRCLE_RADIUS = 90
const CIRCLE_MAX_FILL_RATIO = 0.5

function getFilledCircleDashArrayValue(
  radius: number,
  circleFilledRatio: number,
) {
  const circumference = Math.PI * radius * 2

  return `${circumference * circleFilledRatio}, ${circumference}`
}

type WeightSpeedometerGraphProps = {
  weightIncreaseFulfilled: boolean
  weightIncreaseGrams: number
  targetIncrease: number
}

export default function WeightSpeedometerGraph({
  weightIncreaseFulfilled,
  weightIncreaseGrams,
  targetIncrease,
}: WeightSpeedometerGraphProps) {
  const { backgroundColor: pillBackgroundColor, color: pillColor } =
    getSeverityStyle(
      weightIncreaseFulfilled
        ? GrowthInterpretationSeverity.Normal
        : GrowthInterpretationSeverity.Severe,
    )

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tokens.colors.neutral.white,
        borderWidth: tokens.borderWidth.S,
        borderColor: tokens.colors.neutral.light,
        paddingBottom: tokens.padding.M,
        paddingHorizontal: tokens.padding.L,
        borderRadius: tokens.borderRadius.S,
      }}
    >
      <View
        style={{
          height: 270,
          marginTop: -25,
          paddingTop: tokens.margin.M,
          paddingHorizontal: tokens.margin.L,
        }}
      >
        <View>
          <Svg
            viewBox="0 0 200 110"
            style={{
              transform: [{ rotateX: '180deg' }, { rotateY: '180deg' }],
            }}
          >
            {/* Background */}
            <Circle
              r={`${CIRCLE_RADIUS}`}
              stroke="#E0E0E0"
              strokeWidth={10}
              fill="none"
              cy="10"
              cx="100"
              strokeDasharray={getFilledCircleDashArrayValue(
                CIRCLE_RADIUS,
                0.5,
              )}
              strokeLinecap="round"
            />
            {/* Speedometer fill */}
            <Circle
              r="90"
              stroke={pillColor}
              strokeWidth={10}
              cy="10"
              cx="100"
              strokeDasharray={getFilledCircleDashArrayValue(
                CIRCLE_RADIUS,
                Math.min(
                  CIRCLE_MAX_FILL_RATIO,
                  (Math.max(0, weightIncreaseGrams) * CIRCLE_MAX_FILL_RATIO) /
                    targetIncrease,
                ),
              )}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
        </View>

        {/* Info inside speedometer */}
        <View
          style={{
            marginTop: -160,
            alignItems: 'center',
            gap: tokens.margin.S,
          }}
        >
          <Typography
            variant={{
              size: 'Heading4',
            }}
          >
            {weightIncreaseGrams}
          </Typography>
          <Typography
            variant={{
              size: 'caption',
            }}
            style={{
              color: tokens.colors.neutral.normal,
            }}
          >
            gram
          </Typography>
          <View
            style={{
              backgroundColor: pillBackgroundColor,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: tokens.padding.M,
              paddingVertical: tokens.padding.S,
              borderRadius: tokens.borderRadius.M,
              gap: tokens.margin.S,
            }}
          >
            <MaterialCommunityIcons
              name={weightIncreaseFulfilled ? 'check' : 'close'}
              size={tokens.iconSize.S}
              color={pillColor}
            />
            <Typography
              variant={{
                size: 'caption',
                textStyling: {
                  weight: 'bold',
                },
              }}
              style={{
                color: pillColor,
              }}
            >
              {weightIncreaseFulfilled ? 'Naik' : 'Tidak Naik'}
            </Typography>
          </View>
        </View>
        {/* 0 to target indicator */}
        {/* Transform this by the width of container */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant={{
              size: 'captionS',
              textStyling: {
                weight: 'bold',
              },
            }}
          >
            0 gram
          </Typography>
          <Typography
            variant={{
              size: 'captionS',
              textStyling: {
                weight: 'bold',
              },
            }}
          >
            {targetIncrease} gram
          </Typography>
        </View>
      </View>
      <View
        style={{
          marginTop: -12,
          flexDirection: 'row',
          gap: tokens.margin.S,
          flexWrap: 'wrap',
        }}
      >
        <Typography
          variant={{
            size: 'caption',
          }}
          style={{
            textAlign: 'center',
            color: tokens.colors.neutral.normal,
          }}
        >
          Berat badan anak naik sebesar {weightIncreaseGrams} gram.
          {'\n'}
          Dikategorikan
          <Typography
            variant={{
              size: 'caption',
              textStyling: {
                weight: 'bold',
              },
            }}
            style={{
              color: pillColor,
            }}
          >
            {' '}
            {weightIncreaseFulfilled ? 'Naik' : 'Tidak Naik'}{' '}
          </Typography>
          sesuai standar Kenaikan Berat Minimal (KBM) sebesar {targetIncrease}{' '}
          gram
        </Typography>
      </View>
    </View>
  )
}
