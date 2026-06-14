export class ClientError extends Error {
	statusCode: number

	constructor(message: string, statusCode = 500) {
		super()
		this.message = message
		this.statusCode = statusCode
	}
}

export class BadRequestError extends ClientError {
	constructor(message: string) {
		super(message, 400)
	}
}

export class NotFoundError extends ClientError {
	constructor(message: string) {
		super(message, 404)
	}
}
