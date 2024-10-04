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
	tag: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	images_url: [
		{
			png: {
				type: String,
				required: true,
			},
			gif: {
				type: String,
				required: true,
			},
		},
	],
	tools: [
		{
			id: String,
			name: String,
		},
	],
	description: {
		type: String,
		required: true,
	},
});

export const Tools = mongoose.model('tool', tool);
export const Projects = mongoose.model('project', project);
export const Certificates = mongoose.model('certificate', certificate);
