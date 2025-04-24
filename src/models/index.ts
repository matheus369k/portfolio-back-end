import mongoose from 'mongoose';

const certificate = new mongoose.Schema({
	order: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	emission_data: {
		type: Date,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	create_at: {
		type: Date,
		default: Date.now,
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
	create_at: {
		type: Date,
		default: Date.now,
	},
});

const project = new mongoose.Schema({
	order: {
		type: Number,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	image_url: {
		type: String,
		required: true,
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
	create_at: {
		type: Date,
		default: Date.now,
	},
});

export const db = {
	Tools: {
		front_end: mongoose.model('tools_front', tool),
		back_end: mongoose.model('tools_back', tool),
		another: mongoose.model('tools_another', tool),
	},
	Projects: mongoose.model('project', project),
	Certificates: mongoose.model('certificate', certificate),
};
