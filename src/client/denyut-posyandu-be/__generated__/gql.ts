/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as types from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query GetGrowthGraphData($recordId: String!, $growthType: GrowthType!) {\n    growthGraphStandardData(recordId: $recordId, growthType: $growthType) {\n      standardData {\n        ageInMonths\n        SD0\n        SD1\n        SD2\n        SD3\n        SD1neg\n        SD2neg\n        SD3neg\n      }\n      measurementMonthOld\n      measurementValue\n    }\n  }\n':
    types.GetGrowthGraphDataDocument,
  '\n  query GetGrowthInterpretation($recordId: String!, $growthType: GrowthType!) {\n    growthInterpretation(recordId: $recordId, growthType: $growthType) {\n      label\n      severity\n      previousMeasurementData {\n        measurementDate\n        measurementValue\n      }\n    }\n  }\n':
    types.GetGrowthInterpretationDocument,
  '\n  query GetSingleMonthSKDNData(\n    $posyanduId: String!\n    $recordMonthIdx: Int!\n    $recordYear: Int!\n  ) {\n    singleMeasurementMonthSKDNData(\n      posyanduId: $posyanduId\n      recordMonthIdx: $recordMonthIdx\n      recordYear: $recordYear\n    ) {\n      dCount\n      sCount\n      kCount\n      nCount\n      S36Count\n      LCount\n      goodWeightCount\n      lessWeightCount\n      lowWeightCount\n    }\n  }\n':
    types.GetSingleMonthSkdnDataDocument,
  '\n  query GetValidSKDNMonthYear($posyanduId: String!) {\n    validSKDNMonthYear(posyanduId: $posyanduId) {\n      monthIdx\n      year\n    }\n  }\n':
    types.GetValidSkdnMonthYearDocument,
  '\n  query GetWeightEvaluation($recordId: String!) {\n    weightGrowthEvaluation(recordId: $recordId) {\n      increaseInWeight\n      isEnough\n      targetIncrease\n    }\n  }\n':
    types.GetWeightEvaluationDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetGrowthGraphData($recordId: String!, $growthType: GrowthType!) {\n    growthGraphStandardData(recordId: $recordId, growthType: $growthType) {\n      standardData {\n        ageInMonths\n        SD0\n        SD1\n        SD2\n        SD3\n        SD1neg\n        SD2neg\n        SD3neg\n      }\n      measurementMonthOld\n      measurementValue\n    }\n  }\n',
): (typeof documents)['\n  query GetGrowthGraphData($recordId: String!, $growthType: GrowthType!) {\n    growthGraphStandardData(recordId: $recordId, growthType: $growthType) {\n      standardData {\n        ageInMonths\n        SD0\n        SD1\n        SD2\n        SD3\n        SD1neg\n        SD2neg\n        SD3neg\n      }\n      measurementMonthOld\n      measurementValue\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetGrowthInterpretation($recordId: String!, $growthType: GrowthType!) {\n    growthInterpretation(recordId: $recordId, growthType: $growthType) {\n      label\n      severity\n      previousMeasurementData {\n        measurementDate\n        measurementValue\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetGrowthInterpretation($recordId: String!, $growthType: GrowthType!) {\n    growthInterpretation(recordId: $recordId, growthType: $growthType) {\n      label\n      severity\n      previousMeasurementData {\n        measurementDate\n        measurementValue\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetSingleMonthSKDNData(\n    $posyanduId: String!\n    $recordMonthIdx: Int!\n    $recordYear: Int!\n  ) {\n    singleMeasurementMonthSKDNData(\n      posyanduId: $posyanduId\n      recordMonthIdx: $recordMonthIdx\n      recordYear: $recordYear\n    ) {\n      dCount\n      sCount\n      kCount\n      nCount\n      S36Count\n      LCount\n      goodWeightCount\n      lessWeightCount\n      lowWeightCount\n    }\n  }\n',
): (typeof documents)['\n  query GetSingleMonthSKDNData(\n    $posyanduId: String!\n    $recordMonthIdx: Int!\n    $recordYear: Int!\n  ) {\n    singleMeasurementMonthSKDNData(\n      posyanduId: $posyanduId\n      recordMonthIdx: $recordMonthIdx\n      recordYear: $recordYear\n    ) {\n      dCount\n      sCount\n      kCount\n      nCount\n      S36Count\n      LCount\n      goodWeightCount\n      lessWeightCount\n      lowWeightCount\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetValidSKDNMonthYear($posyanduId: String!) {\n    validSKDNMonthYear(posyanduId: $posyanduId) {\n      monthIdx\n      year\n    }\n  }\n',
): (typeof documents)['\n  query GetValidSKDNMonthYear($posyanduId: String!) {\n    validSKDNMonthYear(posyanduId: $posyanduId) {\n      monthIdx\n      year\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetWeightEvaluation($recordId: String!) {\n    weightGrowthEvaluation(recordId: $recordId) {\n      increaseInWeight\n      isEnough\n      targetIncrease\n    }\n  }\n',
): (typeof documents)['\n  query GetWeightEvaluation($recordId: String!) {\n    weightGrowthEvaluation(recordId: $recordId) {\n      increaseInWeight\n      isEnough\n      targetIncrease\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
