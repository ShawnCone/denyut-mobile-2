import { ApolloClient, InMemoryCache } from '@apollo/client'

export const DenyutPosyanduBeClient = new ApolloClient({
  uri: 'https://denyut-posyandu-be-production.up.railway.app/graphql',
  cache: new InMemoryCache(),
})
