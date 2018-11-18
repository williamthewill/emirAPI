import * as http from 'http'
import {setupListener} from '#src/setup/listener'
import {logger} from '#logger'

async function setupServer() {

	const app = await setupListener()

	return http.createServer(app)
}

export async function startServer(port: number) {
	const server = await setupServer()
	
	server.listen({
		host: '0.0.0.0',
		port,
	}, function() {
		logger.info(`Server listening on port ${port}`)
	})

	return server
}
