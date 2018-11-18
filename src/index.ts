// tslint:disable:no-var-requires no-magic-numbers no-floating-promises

// Rewrite require paths so we're able to use absolute imports
// See the "requireRewrite" in package.json and "paths" in tsconfig.json
require('require-rewrite')(__dirname)

// Load environment variables
require('dotenv-safe').load()

import 'source-map-support/register'

// Map generated JS source back to TS
import {startServer} from '#src/setup/server'

const port = Number(process.env.PORT) || 8080

startServer(port)
	.catch(err => {
		console.error('Error starting server:')
		console.error(err)
	})
