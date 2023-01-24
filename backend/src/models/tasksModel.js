/* Requires */
const { Schema, model, Types } = require('mongoose');

/* Schema */
const taskSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	commentsOnConclusion: { type: String },
	creator: { type: Types.ObjectId, required: true, ref: 'User' },
	responsiblePerson: { type: Types.ObjectId, reqired: true, ref: 'User' },
	createdDate: { type: Date, required: true, default: Date.now() },
	updatedDate: { type: Date, default: Date.now() },
	dueDate: { type: Date, required: true },
	priority: { type: Number, required: true },
	status: { type: String, required: true }
})

/* Exports */
module.exports = model('Task', taskSchema);