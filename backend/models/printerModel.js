const { Schema, model, Types } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const printerSchema = new Schema({
	name: { type: String, required: true },
	ip: { type: String, required: true }
})

printerSchema.plugin(uniqueValidator);

module.exports = model('Printer', printerSchema);