import mongoose from 'mongoose'
import certificate from './schemas/certificate'
import project from './schemas/project'
import tool from './schemas/tool'

class Models {
	private readonly database = mongoose

	Tools() {
		return {
			front_end: this.database.model('tools_front', tool),
			back_end: this.database.model('tools_back', tool),
			another: this.database.model('tools_another', tool),
		}
	}

	Projects() {
		return mongoose.model('project', project)
	}

	Certificates() {
		return mongoose.model('certificate', certificate)
	}
}

const models = new Models()
export default models
