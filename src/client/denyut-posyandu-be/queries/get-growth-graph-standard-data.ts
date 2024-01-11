import { graphql } from '../__generated__'
import { GrowthType } from '../__generated__/graphql'
import { DenyutPosyanduBeClient } from '../client'

const GET_GROWTH_GRAPH_DATA = graphql(`
  query GetGrowthGraphData($recordId: String!, $growthType: GrowthType!) {
    growthGraphStandardData(
      recordId: "f4adcd52-dceb-47cd-9739-28252c31ae88"
      growthType: HEIGHT
    ) {
      standardData {
        ageInMonths
        SD0
        SD1
        SD2
        SD3
        SD1neg
        SD2neg
        SD3neg
      }
      measurementMonthOld
      measurementValue
    }
  }
`)

type GetGrowthGraphDataParams = {
  authToken: string
  recordId: string
  growthType: GrowthType
}

export async function getGrowthGraphData({
  authToken,
  recordId,
  growthType,
}: GetGrowthGraphDataParams) {
  const result = await DenyutPosyanduBeClient.query({
    query: GET_GROWTH_GRAPH_DATA,
    variables: {
      recordId,
      growthType,
    },
    context: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    },
  })

  if (result.error) {
    throw result.error
  }

  return result.data.growthGraphStandardData
}
