import mongoose from 'mongoose';

export const project = new mongoose.Schema({
	access_total: {
		type: Number,
		required: true,
		default: 0,
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
	links: [
		{
			name: {
				type: String,
				required: true,
			},
			link: {
				type: String,
				required: true,
			},
		},
	],
	tools: [String],
	description: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	create_at: {
		type: Date,
		default: Date.now,
	},
});
