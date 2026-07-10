import models from './models'
import certificate from './schemas/certificate'
import project from './schemas/project'
import tool from './schemas/tool'

const certificates = models.Certificates(certificate)
export type CertificateModel = typeof certificates

const Projects = models.Projects(project)
export type ProjectModel = typeof Projects

const tools = models.Tools(tool)
export type ToolModel = typeof tools
