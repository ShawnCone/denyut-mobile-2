import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://denyut-posyandu-be-production.up.railway.app/graphql',
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/client/denyut-posyandu-be/__generated__/': {
      preset: 'client',
      plugins: [],
      // presetConfig: {
      //   gqlTagName: 'gql',
      // },
    },
  },
  // ignoreNoDocuments: true,
}

export default config
