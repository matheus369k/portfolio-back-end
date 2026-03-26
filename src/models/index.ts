import mongoose from 'mongoose';
import { tool } from './tool.js';
import { project } from './project.js';
import { certificate } from './certificate.js';

export const db = {
	Tools: {
		front_end: mongoose.model('tools_front', tool),
		back_end: mongoose.model('tools_back', tool),
		another: mongoose.model('tools_another', tool),
	},
	Projects: mongoose.model('project', project),
	Certificates: mongoose.model('certificate', certificate),
};
