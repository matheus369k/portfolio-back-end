import mongoose from 'mongoose'
import type { CertificateSchema, ProjectSchema, ToolSchema } from './schemas/types'

class Models {
	private readonly database = mongoose

	Tools(tool: ToolSchema) {
		return {
			front_end: this.database.model('tools_front', tool),
			back_end: this.database.model('tools_back', tool),
			another: this.database.model('tools_another', tool),
		}
	}

	Projects(project: ProjectSchema) {
		return mongoose.model('project', project)
	}

	Certificates(certificate: CertificateSchema) {
		return mongoose.model('certificate', certificate)
	}
}

const models = new Models()
export default models
