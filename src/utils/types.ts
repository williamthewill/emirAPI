import { Request, Response, NextFunction } from 'express'

export type ExpressHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

/**
 * NewType<Tag> allows the creation of nominal types.
 * Nominal types can have the same representation as an existing type
 * but a different identity.
 *
 * This means that we can have types that TypeScript treats as incompatible,
 * but at runtime are the same.
 *
 * @example
 * type CustomerId = string & NewType<'CustomerId'>
 * type Email      = string & NewType<'Email'>
 * let email = 'john@example.org' as Email
 * let customerId = '139487'
 * customerId = email // Compile-time error! Email is not assignable to CustomerId
 */
export declare class NewType<Tag extends string> {
	private tag: Tag
}

export { Option, Some, None } from 'space-lift'

export type AuthorizationResult = { ok: true, value: any } | { ok: false, error: string }
export type AuthorizationData = { accessToken: string }
export type AuthorizationHandler = (a: AuthorizationData) => Promise<AuthorizationResult>
