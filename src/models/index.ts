import mongoose from 'mongoose';

const certificate = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	validation_code: {
		type: String,
		required: true,
	},
	image_url: {
		type: String,
		required: true,
	},
	verification_url: {
		type: String,
		required: true,
	},
});

const tool = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	svg_url: {
		type: String,
		required: true,
	},
});

const project = new mongoose.Schema({
	slug: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	images_url: {
		png: {
			type: String,
			required: true,
		},
		gif: {
			type: String,
			required: true,
		},
	},
	links: {
		deploy: {
			type: String,
			required: true,
		},
		repository: {
			type: String,
			required: true,
		},
	},
	tools: [String],
	description: {
		type: String,
		required: true,
	},
});

export const db = {
	Tools: mongoose.model('tool', tool),
	Projects: mongoose.model('project', project),
	Certificates: mongoose.model('certificate', certificate),
};
