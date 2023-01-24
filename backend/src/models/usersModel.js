/* Requires */
const { Schema, model, Types } = require('mongoose');

/* Schema */
const userSchema = new Schema({
	photoPath: { type: String, required: true },
	name: { type: String, required: true },
	role: { type: String, required: true },
	password: { type: String, required: true },
	tasks: [{ type: Types.ObjectId, required: true, ref: 'Task' }]
})

/* Exports */
module.exports = model('User', userSchema);