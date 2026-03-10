import mongoose from 'mongoose';

export const tool = new mongoose.Schema({
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
