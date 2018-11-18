import * as http from 'http'
import {logger} from '#logger'

import express, { json } from 'express'

// HTTP request logger, helps with debugging
import morgan from 'morgan'

import cors from 'cors'


// App routes

type RequestListener = (req: http.IncomingMessage, res: http.ServerResponse) => void
export async function setupListener(): Promise<RequestListener> {
	// Setup express
	const app = express()

	// Log HTTP requests
	if (process.env.NODE_ENV !== 'test') {
		app.use(morgan('dev'))
	}

	// Parse application/json into req.body
	app.use(json())

	/* Allow CORS */
	app.use(cors())
	app.options('*', cors())

	/*
	// Parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));
	*/

	/* IMPORTANT: This should be the last registered middleware */
	const {default: router, setupRouter} = await import('../routes')
	await setupRouter()
	logger.info(`Router setup successfully`)
	app.use(router)

	return app
}
