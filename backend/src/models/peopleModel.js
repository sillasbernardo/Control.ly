/* Requires */
const { Schema, model, Types } = require('mongoose');

/* Schema */
const peopleSchema = new Schema({
	name: { type: String, required: true},
	sector: { type: String, required: true},
	remoteMachines: [{ type: Types.ObjectId, ref: 'RemoteMachines' }]
})

/* Exports */
module.exports = model('People', peopleSchema);