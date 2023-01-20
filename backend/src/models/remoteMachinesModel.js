/* Requires */
const { Schema, model, Types } = require('mongoose');

/* Schema */
const remoteMachinesSchema = new Schema({
	anydeskId: { type: String, required: true, unique: true },
	responsiblePerson: { type: Types.ObjectId, required: true, unique: true, ref: 'People' }
})

/* Exports */
module.exports = model('RemoteMachines', remoteMachinesSchema);