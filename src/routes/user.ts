/* User routes */
import { Router } from 'express'
import * as handler from '#handlers/user'

export function register(router: Router) {
		router.route('/user')
				.get(handler.getUserData as any)
		router.route('/user/dependents')
			.get(handler.getUserDependents as any)
		router.route('/user/invoices')
			.get(handler.getUserInvoices as any)
}
