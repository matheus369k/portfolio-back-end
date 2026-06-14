import mongoose from 'mongoose'

type DatabaseConnectProps = {
	options: mongoose.ConnectOptions | undefined
	url: string
}

class Database {
	private readonly mongoose = mongoose
	private connection: mongoose.Connection | null

	constructor() {
		this.connection = null
	}

	async connect(props: DatabaseConnectProps) {
		if (this.connection) {
			console.log('use mongodb existent connection')
			this.connection = this.mongoose.connection
			return this.connection
		}

		this.setupEventListeners()

		try {
			const options = {
				maxPoolSize: 10, // quantity of open connection simulcast
				serverSelectionTimeoutMS: 5000, // timeout if database fall
				socketTimeoutMS: 45000, // timeout for closed inactive connections
				...props.options,
			}

			const database = await this.mongoose.connect(props.url, options)
			this.connection = database.connection

			return this.connection
		} catch (error) {
			console.error('Error tried connected to database!', error)
		}
	}

	private setupEventListeners() {
		this.mongoose.connection.on('connected', () => {
			console.log('Connected to database!')
		})

		this.mongoose.connection.on('error', (error) => {
			console.error('Error tried connected to database!', error)
		})

		this.mongoose.connection.on('disconnected', () => {
			console.log('Disconnected to database!')
		})

		process.on('SIGINT', async () => {
			await this.disconnect()
		})
	}

	async disconnect() {
		if (!this.connection) return

		try {
			await this.mongoose.disconnect()

			this.connection = null
		} catch (error) {
			console.error('Error tried disconnected to database!', error)
		}
	}
}

const database = new Database()
export default database
