/* Requires */
const { Schema, model } = require('mongoose');

/* Schema */
const printersSchema = new Schema({
	name: { type: String, required: true},
	ip: { type: String, required: true}
})

module.exports = model('Printers', printersSchema);