import { graphql } from '../__generated__'
import { GrowthType } from '../__generated__/graphql'
import { DenyutPosyanduBeClient } from '../client'

const GET_GROWTH_INTERPRETATION_QUERY = graphql(`
  query GetGrowthInterpretation($recordId: String!, $growthType: GrowthType!) {
    growthInterpretation(recordId: $recordId, growthType: $growthType) {
      label
      severity
      differenceSincePrevious
      isEnough
    }
  }
`)

type GetGrowthInterpretationParams = {
  authToken: string
  recordId: string
  growthType: GrowthType
}

export async function getGrowthInterpretation({
  authToken,
  recordId,
  growthType,
}: GetGrowthInterpretationParams) {
  const result = await DenyutPosyanduBeClient.query({
    query: GET_GROWTH_INTERPRETATION_QUERY,
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

  return result.data.growthInterpretation
}
