import './envConfig.js';
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: [
		{
			[`${process.env.NEXT_PUBLIC_MOVIES_API_BASE_URL}/graphql`]: {
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIES_API_TOKEN}`,
				},
			},
		},
	],
	documents: ['src/**/*.tsx'],
	generates: {
		'./src/__generated__/': {
			preset: 'client',
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
		'./src/__generated__/types.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				withHooks: true,
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
