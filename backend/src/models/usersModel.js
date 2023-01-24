/* Requires */
const { Schema, model } = require('mongoose');

/* Schema */
const userSchema = new Schema({
	photoPath: { type: String, required: true },
	name: { type: String, required: true },
	role: { type: String, required: true }
})

/* Exports */
module.exports = model('User', userSchema);