import mongoose from 'mongoose';

export const project = new mongoose.Schema({
	property_id: {
		type: Number || null,
		default: null,
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
