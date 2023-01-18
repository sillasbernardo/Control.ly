/* Imports */
import { Schema, model, Types } from "mongoose";

/* Model */
const printersSchema = new Schema({
	name: { type: String, required: true, unique: true },
	ip: { type: String, required: true, unique: true }
})

export default model('Printer', printersSchema);