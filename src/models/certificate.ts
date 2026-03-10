import mongoose from 'mongoose';

export const certificate = new mongoose.Schema({
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
