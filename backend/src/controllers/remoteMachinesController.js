/* Requires */
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/httpError');
const RemoteMachines = require('../models/remoteMachinesModel');
const People = require('../models/peopleModel');

/* Functions */
const getAllRemoteMachines = async (req, res, next) => {
	let remoteMachines;

	try {
		remoteMachines = await RemoteMachines.find();
	} catch (error) {
		return next(
			new HttpError(`Could not find remote machines.`, 404)
		)
	}

	res.status(200).json({ remoteMachines: remoteMachines.map((machine) => machine.toObject({ getters: true })) })
}

const getRemoteMachine = async (req, res, next) => {
	let remoteMachineId = req.params.rid;

	let remoteMachine;
	try {
		remoteMachine = await RemoteMachines.findById(remoteMachineId);
	} catch (error) {
		return next(
			new HttpError(`Something went wrong, could not find remote machine.`, 500)
		)
	}

	if (!remoteMachine){
		return next(
			new HttpError(`Could not find remote machine for provided id.`, 404)
		)
	}

	res.status(200).json({ remoteMachine: remoteMachine.toObject({ getters: true }) })
}

const createRemoteMachine = async (req, res, next) => {
	// Check for input errors
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		return next(
			new HttpError(`Invalid inputs passed, please check your data.`, 422)
		)
	}

	const { anydeskId, ownerId } = req.body;

	const newRemoteMachine = new RemoteMachines({ anydeskId, owner: ownerId })

	// Check for existing machines
	let existingRemoteMachine;
	try {
		existingRemoteMachine = await RemoteMachines.findOne({ anydeskId: anydeskId });
	} catch (error) {
		return next(
			new HttpError(`Adding new remote machine failed, please try again later.`, 500)
		)
	}

	if (existingRemoteMachine){
		return next(
			new HttpError(`Remote machine already exists.`, 422)
		)
	}

	let owner;
	try {
		owner = await People.findById(ownerId);
	} catch (error) {
		return next(
			new HttpError(`Error on searching for owner.`, 500)
		)
	}

	// Check for existing user
	if (!owner){
		return next(
			new HttpError(`Could not find user to register the remote machine.`, 404)
		)
	}

	try {
		// Use session to save only if both machine and user match and save
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await newRemoteMachine.save({ session: sess });
		owner.remoteMachines.push(newRemoteMachine);
		await owner.save({ session: sess });
		await sess.commitTransaction();
	} catch (error) {
		return next(
			new HttpError(`Creating new remote machine failed, please try again.`, 500)
		)
	}

	res.status(200).json({ remoteMachine: newRemoteMachine })	
}

const updateRemoteMachine = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		return next(
			new HttpError(`Invalid inputs passed, please try again`, 500)
		)
	}

	const remoteMachineId = req.params.rid;
	const { anydeskId, ownerId } = req.body;

	let remoteMachine;
	try {
		remoteMachine = await RemoteMachines.findById(remoteMachineId);
	} catch (error) {
		return next(
			new HttpError(`Error on checking remote machine.`, 500)
		)
	}

	if (!remoteMachine){
		return next(
			new HttpError(`Could not find remote machine, try again later.`, 404)
		)
	}

	remoteMachine.anydeskId = anydeskId;
	remoteMachine.owner = ownerId;

	try {
		await remoteMachine.save();
	} catch (error) {
		return next(
			new HttpError(`Something went wrong, could not update remote machine.`, 500)
		)
	}

	res.status(200).json({ remoteMachine: remoteMachine.toObject({ getters: true }) })

}

const deleteRemoteMachine = async (req, res, next) => {
	const remoteMachineId = req.params.rid;
	
	let remoteMachine;
	try{
		remoteMachine = await RemoteMachines.findById(remoteMachineId).populate('owner');
	} catch{
		return next(
			new HttpError(`Error on processing remote machine object.`, 500)
		)
	}

	if (!remoteMachine){
		return next(
			new HttpError(`Could not find a remote machine for this id.`, 404)
		)
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await remoteMachine.remove({ session: sess });
		remoteMachine.owner.remoteMachines.pull(remoteMachine);
		await remoteMachine.owner.save({ session: sess });
		await sess.commitTransaction();
	} catch (error) {
		return next(
			new HttpError(`Could not delete remote machine.`, 500)
		)
	}

	res.status(200).json({ message: 'Remote machine deleted.' })
}

/* Exports */
exports.getAllRemoteMachines = getAllRemoteMachines;
exports.getRemoteMachine = getRemoteMachine;
exports.createRemoteMachine = createRemoteMachine;
exports.updateRemoteMachine = updateRemoteMachine;
exports.deleteRemoteMachine = deleteRemoteMachine;