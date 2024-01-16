import { graphql } from '../__generated__'
import { DenyutPosyanduBeClient } from '../client'

const GET_SINGLE_MONTH_SKDN_DATA = graphql(`
  query GetSingleMonthSKDNData(
    $posyanduId: String!
    $recordMonthIdx: Int!
    $recordYear: Int!
  ) {
    singleMeasurementMonthSKDNData(
      posyanduId: $posyanduId
      recordMonthIdx: $recordMonthIdx
      recordYear: $recordYear
    ) {
      dCount
      sCount
      kCount
      nCount
      S36Count
      LCount
      goodWeightCount
      lessWeightCount
      lowWeightCount
    }
  }
`)

type GetSingleMonthSKDNDataParams = {
  authToken: string
  posyanduId: string
  recordMonthIdx: number
  recordYear: number
}

export async function getSingleMonthSKDNData({
  authToken,
  posyanduId,
  recordMonthIdx,
  recordYear,
}: GetSingleMonthSKDNDataParams) {
  console.log({ posyanduId, recordMonthIdx, recordYear })
  const result = await DenyutPosyanduBeClient.query({
    query: GET_SINGLE_MONTH_SKDN_DATA,
    variables: {
      posyanduId,
      recordMonthIdx,
      recordYear,
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

  return result.data.singleMeasurementMonthSKDNData
}
