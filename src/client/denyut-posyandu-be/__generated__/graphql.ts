/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type GrowthGraphStandardDataResponse = {
  __typename?: 'GrowthGraphStandardDataResponse'
  measurementMonthOld: Scalars['Int']['output']
  measurementValue: Scalars['Float']['output']
  standardData: Array<SingleMonthGrowthData>
}

export type GrowthInterpretationResponse = {
  __typename?: 'GrowthInterpretationResponse'
  label: Scalars['String']['output']
  previousMeasurementData?: Maybe<PreviousGrowthMeasurementData>
  severity: GrowthInterpretationSeverity
}

export enum GrowthInterpretationSeverity {
  Normal = 'NORMAL',
  Severe = 'SEVERE',
  Warning = 'WARNING',
}

export enum GrowthType {
  Armcirc = 'ARMCIRC',
  Headcirc = 'HEADCIRC',
  Height = 'HEIGHT',
  Weight = 'WEIGHT',
}

export type PreviousGrowthMeasurementData = {
  __typename?: 'PreviousGrowthMeasurementData'
  measurementDate: Scalars['String']['output']
  measurementValue: Scalars['Float']['output']
}

export type Query = {
  __typename?: 'Query'
  growthGraphStandardData?: Maybe<GrowthGraphStandardDataResponse>
  growthInterpretation?: Maybe<GrowthInterpretationResponse>
  singleMeasurementMonthSKDNData: SingleMeasurementMonthSkdnDataResponse
  validSKDNMonthYear: Array<SingleMeasurementMonthYear>
  weightGrowthEvaluation?: Maybe<WeightGrowthEvaluationResponse>
}

export type QueryGrowthGraphStandardDataArgs = {
  growthType: GrowthType
  recordId: Scalars['String']['input']
}

export type QueryGrowthInterpretationArgs = {
  growthType: GrowthType
  recordId: Scalars['String']['input']
}

export type QuerySingleMeasurementMonthSkdnDataArgs = {
  posyanduId: Scalars['String']['input']
  recordMonthIdx: Scalars['Int']['input']
  recordYear: Scalars['Int']['input']
}

export type QueryValidSkdnMonthYearArgs = {
  posyanduId: Scalars['String']['input']
}

export type QueryWeightGrowthEvaluationArgs = {
  recordId: Scalars['String']['input']
}

export type SingleMeasurementMonthSkdnDataResponse = {
  __typename?: 'SingleMeasurementMonthSKDNDataResponse'
  LCount: Scalars['Int']['output']
  S36Count: Scalars['Int']['output']
  dCount: Scalars['Int']['output']
  goodWeightCount: Scalars['Int']['output']
  kCount: Scalars['Int']['output']
  lessWeightCount: Scalars['Int']['output']
  lowWeightCount: Scalars['Int']['output']
  nCount: Scalars['Int']['output']
  sCount: Scalars['Int']['output']
}

export type SingleMeasurementMonthYear = {
  __typename?: 'SingleMeasurementMonthYear'
  monthIdx: Scalars['Int']['output']
  year: Scalars['Int']['output']
}

export type SingleMonthGrowthData = {
  __typename?: 'SingleMonthGrowthData'
  SD0: Scalars['Float']['output']
  SD1: Scalars['Float']['output']
  SD1neg: Scalars['Float']['output']
  SD2: Scalars['Float']['output']
  SD2neg: Scalars['Float']['output']
  SD3: Scalars['Float']['output']
  SD3neg: Scalars['Float']['output']
  ageInMonths: Scalars['Int']['output']
}

export type WeightGrowthEvaluationResponse = {
  __typename?: 'WeightGrowthEvaluationResponse'
  increaseInWeight: Scalars['Float']['output']
  isEnough: Scalars['Boolean']['output']
  targetIncrease: Scalars['Float']['output']
}

export type GetGrowthGraphDataQueryVariables = Exact<{
  recordId: Scalars['String']['input']
  growthType: GrowthType
}>

export type GetGrowthGraphDataQuery = {
  __typename?: 'Query'
  growthGraphStandardData?: {
    __typename?: 'GrowthGraphStandardDataResponse'
    measurementMonthOld: number
    measurementValue: number
    standardData: Array<{
      __typename?: 'SingleMonthGrowthData'
      ageInMonths: number
      SD0: number
      SD1: number
      SD2: number
      SD3: number
      SD1neg: number
      SD2neg: number
      SD3neg: number
    }>
  } | null
}

export type GetGrowthInterpretationQueryVariables = Exact<{
  recordId: Scalars['String']['input']
  growthType: GrowthType
}>

export type GetGrowthInterpretationQuery = {
  __typename?: 'Query'
  growthInterpretation?: {
    __typename?: 'GrowthInterpretationResponse'
    label: string
    severity: GrowthInterpretationSeverity
    previousMeasurementData?: {
      __typename?: 'PreviousGrowthMeasurementData'
      measurementDate: string
      measurementValue: number
    } | null
  } | null
}

export type GetSingleMonthSkdnDataQueryVariables = Exact<{
  posyanduId: Scalars['String']['input']
  recordMonthIdx: Scalars['Int']['input']
  recordYear: Scalars['Int']['input']
}>

export type GetSingleMonthSkdnDataQuery = {
  __typename?: 'Query'
  singleMeasurementMonthSKDNData: {
    __typename?: 'SingleMeasurementMonthSKDNDataResponse'
    dCount: number
    sCount: number
    kCount: number
    nCount: number
    S36Count: number
    LCount: number
    goodWeightCount: number
    lessWeightCount: number
    lowWeightCount: number
  }
}

export type GetValidSkdnMonthYearQueryVariables = Exact<{
  posyanduId: Scalars['String']['input']
}>

export type GetValidSkdnMonthYearQuery = {
  __typename?: 'Query'
  validSKDNMonthYear: Array<{
    __typename?: 'SingleMeasurementMonthYear'
    monthIdx: number
    year: number
  }>
}

export type GetWeightEvaluationQueryVariables = Exact<{
  recordId: Scalars['String']['input']
}>

export type GetWeightEvaluationQuery = {
  __typename?: 'Query'
  weightGrowthEvaluation?: {
    __typename?: 'WeightGrowthEvaluationResponse'
    increaseInWeight: number
    isEnough: boolean
    targetIncrease: number
  } | null
}

export const GetGrowthGraphDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGrowthGraphData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'recordId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'growthType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GrowthType' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'growthGraphStandardData' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recordId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'recordId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'growthType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'growthType' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'standardData' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ageInMonths' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'SD0' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'SD1' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'SD2' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'SD3' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'SD1neg' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'SD2neg' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'SD3neg' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'measurementMonthOld' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'measurementValue' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetGrowthGraphDataQuery,
  GetGrowthGraphDataQueryVariables
>
export const GetGrowthInterpretationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGrowthInterpretation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'recordId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'growthType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GrowthType' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'growthInterpretation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recordId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'recordId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'growthType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'growthType' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'severity' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'previousMeasurementData' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'measurementDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'measurementValue' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetGrowthInterpretationQuery,
  GetGrowthInterpretationQueryVariables
>
export const GetSingleMonthSkdnDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSingleMonthSKDNData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'posyanduId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'recordMonthIdx' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'recordYear' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'singleMeasurementMonthSKDNData' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'posyanduId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'posyanduId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recordMonthIdx' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'recordMonthIdx' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recordYear' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'recordYear' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'dCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'kCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'nCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'S36Count' } },
                { kind: 'Field', name: { kind: 'Name', value: 'LCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'goodWeightCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lessWeightCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lowWeightCount' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSingleMonthSkdnDataQuery,
  GetSingleMonthSkdnDataQueryVariables
>
export const GetValidSkdnMonthYearDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetValidSKDNMonthYear' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'posyanduId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'validSKDNMonthYear' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'posyanduId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'posyanduId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'monthIdx' } },
                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetValidSkdnMonthYearQuery,
  GetValidSkdnMonthYearQueryVariables
>
export const GetWeightEvaluationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetWeightEvaluation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'recordId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'weightGrowthEvaluation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recordId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'recordId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'increaseInWeight' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isEnough' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'targetIncrease' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetWeightEvaluationQuery,
  GetWeightEvaluationQueryVariables
>
