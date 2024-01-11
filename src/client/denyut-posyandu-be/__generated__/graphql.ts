/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type GrowthGraphStandardDataResponse = {
  __typename?: 'GrowthGraphStandardDataResponse';
  measurementMonthOld: Scalars['Int']['output'];
  measurementValue: Scalars['Float']['output'];
  standardData: Array<SingleMonthGrowthData>;
};

export type GrowthInterpretationResponse = {
  __typename?: 'GrowthInterpretationResponse';
  differenceSincePrevious?: Maybe<Scalars['Float']['output']>;
  isEnough?: Maybe<Scalars['Boolean']['output']>;
  label: Scalars['String']['output'];
  severity: GrowthInterpretationSeverity;
};

export enum GrowthInterpretationSeverity {
  Normal = 'NORMAL',
  Severe = 'SEVERE',
  Warning = 'WARNING'
}

export enum GrowthType {
  Armcirc = 'ARMCIRC',
  Headcirc = 'HEADCIRC',
  Height = 'HEIGHT',
  Weight = 'WEIGHT'
}

export type Query = {
  __typename?: 'Query';
  growthGraphStandardData?: Maybe<GrowthGraphStandardDataResponse>;
  growthInterpretation?: Maybe<GrowthInterpretationResponse>;
};


export type QueryGrowthGraphStandardDataArgs = {
  growthType: GrowthType;
  recordId: Scalars['String']['input'];
};


export type QueryGrowthInterpretationArgs = {
  growthType: GrowthType;
  recordId: Scalars['String']['input'];
};

export type SingleMonthGrowthData = {
  __typename?: 'SingleMonthGrowthData';
  SD0: Scalars['Float']['output'];
  SD1: Scalars['Float']['output'];
  SD1neg: Scalars['Float']['output'];
  SD2: Scalars['Float']['output'];
  SD2neg: Scalars['Float']['output'];
  SD3: Scalars['Float']['output'];
  SD3neg: Scalars['Float']['output'];
  ageInMonths: Scalars['Int']['output'];
};

export type GetGrowthGraphDataQueryVariables = Exact<{
  recordId: Scalars['String']['input'];
  growthType: GrowthType;
}>;


export type GetGrowthGraphDataQuery = { __typename?: 'Query', growthGraphStandardData?: { __typename?: 'GrowthGraphStandardDataResponse', measurementMonthOld: number, measurementValue: number, standardData: Array<{ __typename?: 'SingleMonthGrowthData', ageInMonths: number, SD0: number, SD1: number, SD2: number, SD3: number, SD1neg: number, SD2neg: number, SD3neg: number }> } | null };

export type GetGrowthInterpretationQueryVariables = Exact<{
  recordId: Scalars['String']['input'];
  growthType: GrowthType;
}>;


export type GetGrowthInterpretationQuery = { __typename?: 'Query', growthInterpretation?: { __typename?: 'GrowthInterpretationResponse', label: string, severity: GrowthInterpretationSeverity, differenceSincePrevious?: number | null, isEnough?: boolean | null } | null };


export const GetGrowthGraphDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGrowthGraphData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recordId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"growthType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GrowthType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"growthGraphStandardData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"recordId"},"value":{"kind":"StringValue","value":"f4adcd52-dceb-47cd-9739-28252c31ae88","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"growthType"},"value":{"kind":"EnumValue","value":"HEIGHT"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"standardData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ageInMonths"}},{"kind":"Field","name":{"kind":"Name","value":"SD0"}},{"kind":"Field","name":{"kind":"Name","value":"SD1"}},{"kind":"Field","name":{"kind":"Name","value":"SD2"}},{"kind":"Field","name":{"kind":"Name","value":"SD3"}},{"kind":"Field","name":{"kind":"Name","value":"SD1neg"}},{"kind":"Field","name":{"kind":"Name","value":"SD2neg"}},{"kind":"Field","name":{"kind":"Name","value":"SD3neg"}}]}},{"kind":"Field","name":{"kind":"Name","value":"measurementMonthOld"}},{"kind":"Field","name":{"kind":"Name","value":"measurementValue"}}]}}]}}]} as unknown as DocumentNode<GetGrowthGraphDataQuery, GetGrowthGraphDataQueryVariables>;
export const GetGrowthInterpretationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGrowthInterpretation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recordId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"growthType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GrowthType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"growthInterpretation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"recordId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recordId"}}},{"kind":"Argument","name":{"kind":"Name","value":"growthType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"growthType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"differenceSincePrevious"}},{"kind":"Field","name":{"kind":"Name","value":"isEnough"}}]}}]}}]} as unknown as DocumentNode<GetGrowthInterpretationQuery, GetGrowthInterpretationQueryVariables>;