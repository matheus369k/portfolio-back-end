import mongoose from 'mongoose';

export const websiteStatus = new mongoose.Schema({
	views: {
		type: Number,
		required: true,
		default: 0,
	},
	create_at: {
		type: Date,
		default: Date.now,
	},
});
