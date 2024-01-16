import { graphql } from '../__generated__'
import { DenyutPosyanduBeClient } from '../client'

const GET_VALID_SKDN_MONTHS = graphql(`
  query GetValidSKDNMonthYear($posyanduId: String!) {
    validSKDNMonthYear(posyanduId: $posyanduId) {
      monthIdx
      year
    }
  }
`)

type GetValidSKDNMonthsParams = {
  authToken: string
  posyanduId: string
}

export async function getValidSKDNMonths({
  authToken,
  posyanduId,
}: GetValidSKDNMonthsParams) {
  const result = await DenyutPosyanduBeClient.query({
    query: GET_VALID_SKDN_MONTHS,
    variables: {
      posyanduId,
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

  return result.data.validSKDNMonthYear
}
