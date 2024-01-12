import { graphql } from '../__generated__'
import { DenyutPosyanduBeClient } from '../client'

const GET_WEIGHT_EVALUATION_QUERY = graphql(`
  query GetWeightEvaluation($recordId: String!) {
    weightGrowthEvaluation(recordId: $recordId) {
      increaseInWeight
      isEnough
      targetIncrease
    }
  }
`)

type GetWeightEvaluationParams = {
  authToken: string
  recordId: string
}

export async function getWeightEvaluation({
  authToken,
  recordId,
}: GetWeightEvaluationParams) {
  const result = await DenyutPosyanduBeClient.query({
    query: GET_WEIGHT_EVALUATION_QUERY,
    variables: {
      recordId,
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

  return result.data.weightGrowthEvaluation
}
