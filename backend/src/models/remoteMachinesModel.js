/* Requires */
const { Schema, model, Types } = require('mongoose');

/* Schema */
const remoteMachinesSchema = new Schema({
	anydeskId: { type: String, required: true},
	owner: { type: Types.ObjectId, required: true, ref: 'People' }
})

/* Exports */
module.exports = model('RemoteMachines', remoteMachinesSchema);