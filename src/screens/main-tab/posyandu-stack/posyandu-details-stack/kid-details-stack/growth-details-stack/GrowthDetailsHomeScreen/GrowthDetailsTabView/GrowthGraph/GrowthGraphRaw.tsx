import { SingleMonthGrowthData } from '@/client/denyut-posyandu-be/__generated__/graphql'
import { useKidInfoContext } from '@/context/KidInfoContext'
import Typography from '@/design-system/Typography'
import { scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'
import { Fragment } from 'react'
import { View } from 'react-native'
import { Circle, Path, Svg, Text } from 'react-native-svg'

import { GrowthMeasurementTypes } from '../../../utils'
import {
  GraphSDType,
  getLineColorForStandardCurves,
  getSexGraphColor,
} from './utils'

// Constant for all cases
const GRAPH_HEIGHT_WIDTH = 240
const GRAPH_MARGIN = {
  horizontal: 20,
  vertical: 20,
}
const TICK_PIXEL_LENGTH = 4
const TICK_FONT_SIZE = 10

type tickInfo = {
  pixelValue: number
  label: string
}

type GrowthGraphRawProps = {
  measurementType: GrowthMeasurementTypes
  standardData: SingleMonthGrowthData[]
  measurementValue: number
  measurementMonthOld: number
}

export default function GrowthGraphRaw({
  measurementType,
  standardData,
  measurementValue,
  measurementMonthOld,
}: GrowthGraphRawProps) {
  const {
    kidInfo: { sex },
  } = useKidInfoContext()

  // Get x axis tick values
  const minMonth = standardData[0].ageInMonths
  const maxMonth = standardData[standardData.length - 1].ageInMonths

  const scaleX = scaleLinear(
    [minMonth, maxMonth],
    [GRAPH_MARGIN.horizontal, GRAPH_HEIGHT_WIDTH - GRAPH_MARGIN.horizontal],
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
    [GRAPH_HEIGHT_WIDTH - GRAPH_MARGIN.vertical, GRAPH_MARGIN.vertical], // Flipped because Y axis
  )

  // Get tick value for measurement, from min to max, with interval of measurementValueTickInterval
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

  // Line translator, for drawing lines of standard data (Format is [monthValue, measurementValue])
  const lineTranslator = line()
    .x(d => scaleX(d[0]))
    .y(d => scaleY(d[1]))

  const standardizedMonthsDataToUse = standardData

  // Only get path for within-range values
  const getTranslatedMeasurementStandardData = (SDType: GraphSDType) => {
    const dataToUse = standardData.map(
      cDatum => [cDatum.ageInMonths, cDatum[SDType]] satisfies [number, number],
    )

    // Make data to use have higher resolution, split month to 0.5, interpolate values in between
    const SPLIT_DATA = 5
    const dataToUseWithHigherTickResolution: [number, number][] = []
    for (let i = 0; i < dataToUse.length - 1; i++) {
      const cData = dataToUse[i]
      const nextData = dataToUse[i + 1]

      const monthDiff = nextData[0] - cData[0]
      const measurementDiff = nextData[1] - cData[1]

      // Split data to 10 parts
      for (let j = 0; j < SPLIT_DATA; j++) {
        const cMonth = cData[0] + (monthDiff / SPLIT_DATA) * j
        const cMeasurement = cData[1] + (measurementDiff / SPLIT_DATA) * j

        dataToUseWithHigherTickResolution.push([cMonth, cMeasurement])
      }
    }

    // Filter data to use with higher tick resolution to only within range
    const dataToUseWithHigherTickResolutionWithinRange =
      dataToUseWithHigherTickResolution.filter(cData => {
        const [cMonth, cMeasurement] = cData

        return (
          cMonth >= minMonth &&
          cMonth <= maxMonth &&
          cMeasurement >= minMeasurementValue &&
          cMeasurement <= maxMeasurementValue
        )
      })

    return (
      lineTranslator(dataToUseWithHigherTickResolutionWithinRange) ?? undefined
    )
  }
  const SDTypesToDraw: GraphSDType[] = [
    'SD3',
    'SD2',
    'SD1',
    'SD0',
    'SD1neg',
    'SD2neg',
    'SD3neg',
  ]

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
      <Svg viewBox={`0 0 ${GRAPH_HEIGHT_WIDTH} ${GRAPH_HEIGHT_WIDTH}`}>
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
          )} ${
            measurementTickValues[measurementTickValues.length - 1].pixelValue
          }`}
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
        {SDTypesToDraw.map((cSDType, idx) => {
          return (
            <Path
              key={idx}
              stroke={getLineColorForStandardCurves(cSDType)}
              strokeWidth={2}
              d={getTranslatedMeasurementStandardData(cSDType)}
              fill="none"
            />
          )
        })}

        {/* Point */}
        <Circle
          cx={scaleX(measurementMonthOld)}
          cy={scaleY(measurementValue)}
          r="5"
          fill={getSexGraphColor(sex).dark}
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
