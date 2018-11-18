import * as bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'
import { totp, authenticator } from 'otplib'
import { readdirSync } from 'fs'
import { times, join } from 'ramda'
import pg from '#database'
import {logger} from '#logger'


const NUM_RANDOM_BYTES = 16
const RANDOM_PASSWORD_SIZE = 8
const BCRYPT_WORK_FACTOR = Number(process.env.BCRYPT_WORK_FACTOR)

export function genOTPSecret() {
	return authenticator.generateSecret()
}

export function genSaleCode(secret: string) {
	return totp.generate(secret)
}

export function validateSaleCode(saleCode: string, secret: string): boolean {
	return totp.check(saleCode, secret)
}

export function genPwdHash(password: string): Promise<string> {
	console.log(password, BCRYPT_WORK_FACTOR)
	return bcrypt.hash(password, BCRYPT_WORK_FACTOR)
}

export function genRandomPassword() {
	return randomBytes(RANDOM_PASSWORD_SIZE).toString('hex')
}

export function comparePwdToHash(plaintext: string, hash: string): Promise<boolean> {
	return bcrypt.compare(plaintext, hash)
}

const randomDigit = () => Math.floor(Math.random() * 10) // tslint:disable-line

export function genPhoneValidationCode() {
	if (process.env.NODE_ENV === 'development') {
		return '0000'
	}
	const digits = times(randomDigit, 4) // tslint:disable-line
	return join('', digits)
}

export function genRandomToken() {
	return randomBytes(NUM_RANDOM_BYTES).toString('hex')
}

export function isUniqueConstraintError(err: { code: string }) {
	// Knex is stupid and doesn't throw custom errors
	return err.code == '23505'
}

export function isInvalidColumnError(err: { code: string }) {
	// Fuck knex
	return err.code == '42703'
}

export function isForeignKeyViolationError(err: { code: string }) {
	// Knex is a stupid fucking mistake
	return err.code == '23503'
}

export function addDays(date: Date, days: number) {
	const finalDate = new Date(date)
	finalDate.setDate(finalDate.getDate() + days)
	return finalDate
}

export function addMinutes(date: Date, minutes: number) {
	const finalDate = new Date(date)
	finalDate.setTime(finalDate.getTime() + minutes*60000) // tslint:disable-line
	return finalDate
}

export function stringifyPgParams(params: any[]) {
	return params.map(p => `'${p}'`).join(',')
}

export function updateCompositeTypeSql(obj: object, typeName: string): object {
	const aux: {[key: string]: string} = {}
	for (const [key, value] of Object.entries(obj)) {
		aux[`${typeName}.${key}`] = `${value}`
	}
	return aux
}

interface PhoneInfo {
	region: string,
	number: string,
}

interface MainAddress {
	street: string,
	number: string,
	complement: string,
	zipCode: string,
	district: string,
	city: string,
	state: string,
}

export function comparePhoneInfo(firstPhone: PhoneInfo, secondPhone: PhoneInfo) {
	return firstPhone.region === secondPhone.region && firstPhone.number === secondPhone.number
}

export function phoneInfoWhereStatement(phoneInfo: PhoneInfo) {
	return pg.raw(`'${phoneInfo.region}' = ("phoneInfo").region and '${phoneInfo.number}' = ("phoneInfo").number`)
}

export function phoneInfoInsertionSql(phoneInfo: PhoneInfo) {
	return pg.raw(`ROW('${phoneInfo.region}','${phoneInfo.number}')`)
}

export function mainAddressInsertionSql(address: MainAddress) {
	return pg.raw(`ROW('${address.street}','${address.number}','${address.complement}','${address.zipCode}','${address.district}','${address.city}','${address.state}')`)
}

export function intersection<T>(set1: Set<T>, set2: Set<T>): Set<T> {
	const common = new Set<T>()
	for (const elem of set1) {
		if (set2.has(elem)) {
			common.add(elem)
		}
	}
	return common
}

export function difference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
	return new Set([...set1].filter(x => !set2.has(x)))
}

type BirthDate = { day: number, month: number, year: number }
export function convertBirthDateToDbDate(birthDate: BirthDate): BirthDate {
	return { ...birthDate, month: birthDate.month - 1 }
}

export function parseBirthDate(birthDate: BirthDate): Date {
	const { year, month, day } = convertBirthDateToDbDate(birthDate)
	return new Date(year, month, day)
}

/**
  * Imports all .js files under a directory and
  * returns an array of the imported modules
  */
export async function importDir<T = any>(dir: string): Promise<T[]> {
	const modules = []
	for (const filename of readdirSync(dir)) {
		if (filename.match(/\.js$/) !== null && filename !== 'index.js') {
			const path = './' + filename.replace('.js', '')
			const module = await import(dir + path)
			logger.debug(`Imported ${path} dynamically`)
			modules.push(module)
		}
	}
	return modules
}

export function generateCSV(jsonList: object[]): string {
	if (jsonList.length == 0) {
		return ''
	}
	const values = jsonList.map(json => Object.values(json))
	const header = Object.keys(jsonList[0])
	const csvItems = [ header, ...values ]
	return csvItems.map(item => item.join(',')).join('\n')
}

export function parsePrice(value: number, preValue?: string, posValue?: string): string {
	const priceFormat = `${preValue} ${value.toFixed(2).replace('.', ',')} ${posValue}` // tslint:disable-line
	return priceFormat
}

export function assertNever(x: never): never {
 	throw new Error('Unexpected object: ' + x)
}
