/* Requires */
const { Schema, model } = require('mongoose');

/* Schema */
const peopleSchema = new Schema({
	name: { type: String, required: true, unique: true },
	sector: { type: String, required: true, unique: true }
})

/* Exports */
module.exports = model('People', peopleSchema);