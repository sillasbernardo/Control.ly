/* Requires */
const { Schema, model, Types } = require('mongoose');

/* Schema */
const peopleSchema = new Schema({
	name: { type: String, required: true, unique: true },
	sector: { type: String, required: true, unique: true },
	remoteMachines: [{ type: Types.ObjectId, unique: true, ref: 'RemoteMachines' }]
})

/* Exports */
module.exports = model('People', peopleSchema);