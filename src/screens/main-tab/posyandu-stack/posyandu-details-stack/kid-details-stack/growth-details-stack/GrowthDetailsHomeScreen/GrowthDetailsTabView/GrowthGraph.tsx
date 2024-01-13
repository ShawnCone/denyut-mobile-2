import { SingleMonthGrowthData } from '@/client/denyut-posyandu-be/__generated__/graphql'
import { useKidInfoContext } from '@/context/KidInfoContext'
import Typography from '@/design-system/Typography'
import { sexSchemaType } from '@/design-system/forms/SexSelectionFormInput'
import { tokens } from '@/design-system/tokens/tokens'
import { scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'
import { Fragment } from 'react'
import { View } from 'react-native'
import { Circle, Path, Svg, Text } from 'react-native-svg'
import { GrowthMeasurementTypes } from './utils'

// Constant for all cases
const GRAPH_HEIGHT_WIDTH = 240
const GRAPH_MARGIN = 20
const TICK_PIXEL_LENGTH = 4
const monthValueRange = 5 // Always 5 months for x range
const monthTickInterval = 1
const TICK_FONT_SIZE = 10

const standardData = [
  {
    ageInMonths: 2,
    SD0: 57.1,
    SD1: 59.1,
    SD2: 61.1,
    SD3: 63.2,
    SD1neg: 55,
    SD2neg: 53,
    SD3neg: 51,
  },
  {
    ageInMonths: 3,
    SD0: 59.8,
    SD1: 61.9,
    SD2: 64,
    SD3: 66.1,
    SD1neg: 57.7,
    SD2neg: 55.6,
    SD3neg: 53.5,
  },
  {
    ageInMonths: 4,
    SD0: 62.1,
    SD1: 64.3,
    SD2: 66.4,
    SD3: 68.6,
    SD1neg: 59.9,
    SD2neg: 57.8,
    SD3neg: 55.6,
  },
  {
    ageInMonths: 5,
    SD0: 64,
    SD1: 66.2,
    SD2: 68.5,
    SD3: 70.7,
    SD1neg: 61.8,
    SD2neg: 59.6,
    SD3neg: 57.4,
  },
  {
    ageInMonths: 6,
    SD0: 65.7,
    SD1: 68,
    SD2: 70.3,
    SD3: 72.5,
    SD1neg: 63.5,
    SD2neg: 61.2,
    SD3neg: 58.9,
  },
  {
    ageInMonths: 7,
    SD0: 67.3,
    SD1: 69.6,
    SD2: 71.9,
    SD3: 74.2,
    SD1neg: 65,
    SD2neg: 62.7,
    SD3neg: 60.3,
  },
  {
    ageInMonths: 8,
    SD0: 68.7,
    SD1: 71.1,
    SD2: 73.5,
    SD3: 75.8,
    SD1neg: 66.4,
    SD2neg: 64,
    SD3neg: 61.7,
  },
  {
    ageInMonths: 9,
    SD0: 70.1,
    SD1: 72.6,
    SD2: 75,
    SD3: 77.4,
    SD1neg: 67.7,
    SD2neg: 65.3,
    SD3neg: 62.9,
  },
  {
    ageInMonths: 10,
    SD0: 71.5,
    SD1: 73.9,
    SD2: 76.4,
    SD3: 78.9,
    SD1neg: 69,
    SD2neg: 66.5,
    SD3neg: 64.1,
  },
  {
    ageInMonths: 11,
    SD0: 72.8,
    SD1: 75.3,
    SD2: 77.8,
    SD3: 80.3,
    SD1neg: 70.3,
    SD2neg: 67.7,
    SD3neg: 65.2,
  },
  {
    ageInMonths: 12,
    SD0: 74,
    SD1: 76.6,
    SD2: 79.2,
    SD3: 81.7,
    SD1neg: 71.4,
    SD2neg: 68.9,
    SD3neg: 66.3,
  },
]

const measurementMonthOld = 7
const measurementValue = 2

type tickInfo = {
  pixelValue: number
  label: string
}

type GrowthGraphProps = {
  measurementType: GrowthMeasurementTypes
}

export default function GrowthGraph({ measurementType }: GrowthGraphProps) {
  const {
    kidInfo: { sex },
  } = useKidInfoContext()

  // Get x axis tick values
  const minMonth = standardData[0].ageInMonths
  const maxMonth = standardData[standardData.length - 1].ageInMonths

  const scaleX = scaleLinear(
    [minMonth, maxMonth],
    [GRAPH_MARGIN, GRAPH_HEIGHT_WIDTH - GRAPH_MARGIN],
  )

  const monthTickIntervalValues: tickInfo[] = standardData.map(cDatum => {
    return {
      pixelValue: scaleX(cDatum.ageInMonths),
      label: `${cDatum.ageInMonths}`,
    }
  })

  // Get y axis tick values
  const { measurementValueRange, measurementValueTickInterval } =
    getMeasurementValueRangesAndIntervals(measurementType)

  const minMeasurementValue = Math.max(
    0,
    measurementValue - Math.ceil(measurementValueRange / 2),
  )
  const maxMeasurementValue =
    measurementValue + Math.ceil(measurementValueRange / 2)

  const scaleY = scaleLinear(
    [minMeasurementValue, maxMeasurementValue],
    [GRAPH_HEIGHT_WIDTH - GRAPH_MARGIN, GRAPH_MARGIN], // Flipped because Y axis
  )

  const measurementTickValues: tickInfo[] = [
    ...Array(Math.floor(measurementValueRange / measurementValueTickInterval)),
  ].map((_, cIdx) => {
    const cMeasurementValue =
      minMeasurementValue + cIdx * measurementValueTickInterval

    const tickValue =
      Math.ceil(
        (cMeasurementValue + measurementValueTickInterval / 2) /
          measurementValueTickInterval,
      ) * measurementValueTickInterval

    return {
      pixelValue: scaleY(tickValue),
      label: `${tickValue}`,
    }
  })

  // Line translator (Format is [monthValue, measurementValue])
  const lineTranslator = line()
    .x(d => scaleX(d[0]))
    .y(d => scaleY(d[1]))

  const standardizedMonthsDataToUse = standardData

  if (standardizedMonthsDataToUse.length === 0) {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>
          Tidak ada data standar yang tersedia untuk membuat grafik
        </Typography>
      </View>
    )
  }
  return (
    <View
      style={{
        height: GRAPH_HEIGHT_WIDTH,
        width: GRAPH_HEIGHT_WIDTH,
      }}
    >
      <Svg>
        {/* X Axis and ticks*/}
        <Path
          stroke="black"
          strokeWidth={1}
          d={`M ${scaleX(minMonth)} ${scaleY(minMeasurementValue)} L ${scaleX(
            maxMonth,
          )} ${scaleY(minMeasurementValue)}`}
        />
        {monthTickIntervalValues.map((cTickInfo, idx) => {
          return (
            <Fragment key={idx}>
              <Text
                fontSize={TICK_FONT_SIZE}
                stroke="black"
                strokeWidth={0.25}
                fill="black"
                x={cTickInfo.pixelValue - Math.round(TICK_FONT_SIZE / 3)}
                y={scaleY(minMeasurementValue) + 12}
              >
                {cTickInfo.label}
              </Text>
              <Path
                stroke="black"
                strokeWidth={2}
                d={`M ${cTickInfo.pixelValue} ${
                  scaleY(minMeasurementValue) + TICK_PIXEL_LENGTH / 2
                } L
                ${cTickInfo.pixelValue} ${
                  scaleY(minMeasurementValue) - TICK_PIXEL_LENGTH / 2
                }
                `}
              />
            </Fragment>
          )
        })}

        {/* Y Axis and ticks*/}
        <Path
          stroke="black"
          strokeWidth={1}
          d={`M ${scaleX(minMonth)} ${scaleY(minMeasurementValue)} L ${scaleX(
            minMonth,
          )} ${scaleY(maxMeasurementValue)}`}
        />
        {measurementTickValues.map((cTickInfo, idx) => {
          return (
            <Fragment key={idx}>
              <Text
                fontSize={TICK_FONT_SIZE}
                stroke="black"
                strokeWidth={0.25}
                fill="black"
                x={scaleX(minMonth) - 18}
                y={cTickInfo.pixelValue + Math.round(TICK_FONT_SIZE / 3)}
              >
                {cTickInfo.label}
              </Text>
              <Path
                stroke="black"
                strokeWidth={2}
                d={`M ${scaleX(minMonth) - Math.round(TICK_PIXEL_LENGTH / 2)} ${
                  cTickInfo.pixelValue
                } L
                ${scaleX(minMonth) + Math.round(TICK_PIXEL_LENGTH / 2)} ${
                  cTickInfo.pixelValue
                } 
                `}
              />
            </Fragment>
          )
        })}

        {/* Lines */}
        {/* SD 3 */}
        <Path
          stroke={getLineColorForStandardCurves('SD3')}
          strokeWidth={2}
          d={
            lineTranslator(
              standardizedMonthsDataToUse.map(cDatum => [
                cDatum.ageInMonths,
                cDatum.SD3,
              ]),
            ) ?? undefined
          }
        />
        {/* SD 2 */}
        <Path
          stroke={getLineColorForStandardCurves('SD2')}
          strokeWidth={2}
          d={
            lineTranslator(
              standardizedMonthsDataToUse.map(cDatum => [
                cDatum.ageInMonths,
                cDatum.SD2,
              ]),
            ) ?? undefined
          }
        />
        {/* SD 1 */}
        <Path
          stroke={getLineColorForStandardCurves('SD1')}
          strokeWidth={2}
          d={
            lineTranslator(
              standardizedMonthsDataToUse.map(cDatum => [
                cDatum.ageInMonths,
                cDatum.SD1,
              ]),
            ) ?? undefined
          }
        />
        {/* SD 0 */}
        <Path
          stroke={getLineColorForStandardCurves('SD0')}
          strokeWidth={2}
          d={
            lineTranslator(
              standardizedMonthsDataToUse.map(cDatum => [
                cDatum.ageInMonths,
                cDatum.SD0,
              ]),
            ) ?? undefined
          }
        />
        {/* SD -1 */}
        <Path
          stroke={getLineColorForStandardCurves('SD1neg')}
          strokeWidth={2}
          d={
            lineTranslator(
              standardizedMonthsDataToUse.map(cDatum => [
                cDatum.ageInMonths,
                cDatum.SD1neg,
              ]),
            ) ?? undefined
          }
        />
        {/* SD -2 */}
        <Path
          stroke={getLineColorForStandardCurves('SD2neg')}
          strokeWidth={2}
          d={
            lineTranslator(
              standardizedMonthsDataToUse.map(cDatum => [
                cDatum.ageInMonths,
                cDatum.SD2neg,
              ]),
            ) ?? undefined
          }
        />

        {/* SD -3 */}
        <Path
          stroke={getLineColorForStandardCurves('SD3neg')}
          strokeWidth={2}
          d={
            lineTranslator(
              standardizedMonthsDataToUse.map(cDatum => [
                cDatum.ageInMonths,
                cDatum.SD3neg,
              ]),
            ) ?? undefined
          }
        />

        {/* Point */}
        <Circle
          cx={scaleX(measurementMonthOld)}
          cy={scaleY(measurementValue)}
          r="5"
          fill={getSexGraphColor(sex)}
        />
      </Svg>
    </View>
  )
}

function getMeasurementValueRangesAndIntervals(
  inMeasurementType: GrowthMeasurementTypes,
): {
  measurementValueRange: number
  measurementValueTickInterval: number
} {
  if (inMeasurementType === 'armCirc') {
    return {
      measurementValueRange: 10,
      measurementValueTickInterval: 1,
    }
  }

  return {
    measurementValueRange: 15,
    measurementValueTickInterval: 5,
  }
}

type GraphSDType = Omit<
  keyof SingleMonthGrowthData,
  '_typename' | 'ageInMonths'
>

function getLineColorForStandardCurves(inCurveMode: GraphSDType) {
  if (inCurveMode === 'SD3' || inCurveMode === 'SD3neg') {
    return tokens.colors.destructive.dark
  }

  if (inCurveMode === 'SD2' || inCurveMode === 'SD2neg') {
    return tokens.colors.warning.dark
  }

  if (inCurveMode === 'SD1' || inCurveMode === 'SD1neg') {
    return tokens.colors.primary.dark
  }
  return tokens.colors.neutral.dark
}

export function getSexGraphColor(inSex: sexSchemaType): string {
  switch (inSex) {
    case 'male':
      return '#0097D7'
    case 'female':
      return '#E47DB2'
  }
}
