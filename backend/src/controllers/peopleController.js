/* Requires */
const { validationResult } = require('express-validator');

const HttpError = require('../models/httpError');
const People = require('../models/peopleModel');

/* Functions */
const getPeople = async (req, res, next) => {
	let people;

	try {
		people = await People.find();
	} catch (error) {
		return next(
			HttpError.error01()
		)
	}

	res.status(200).json({ people: people.map((person) => person.toObject({ getters: true })) })
}

const getPerson = async (req, res, next) => {
	const personId = req.params.ppid;

	let person;
	try {
		person = await People.findById(personId);
	} catch (error) {
		return next(
			// new HttpError(`Something went wrong, could not find person.`, 500)
			HttpError.error01()
		)
	}

	if (!person){
		return next(
			new HttpError(`Could not find a person for this id.`, 404)
		)
	}

	res.status(200).json({ person: person.toObject({ getters: true }) })
}

const createPerson = async (req, res, next) => {
	// Check for errors in request
	const error = validationResult(req);
	if (!error.isEmpty){
		return next(
			new HttpError(`Invalid inputs passed, please check your data.`, 422)
		)
	}

	const { name, sector } = req.body;

	// Check if person exist
	let existingPerson;
	try {
		existingPerson = await People.findOne({ name: name, sector: sector })
	} catch (error) {
		return next(
			new HttpError(`Adding person failed, please try again later.`, 500)
		)
	}

	if (existingPerson){
		return next(
			new HttpError(`Person already exists.`, 422)
		)
	}

	// Create a new person instance
	const newPerson = new People({ name, sector });

	try {
		await newPerson.save();
	} catch (error) {
		return next(
			new HttpError(`Adding new person failed, please try again later.`, 500)
		)
	}

	res.status(200).json({ 
		personId: newPerson.id,
		name: newPerson.name,
		sector: newPerson.sector
	 })
}

const updatePerson = async (req, res, next) => {
	// Check for errors in request
	const error = validationResult(req);
	if (!error.isEmpty){
		return next(
			new HttpError(`Invalid inputs passed, please check your data.`, 422)
		)
	}

	const { name, sector } = req.body;
	const personId = req.params.ppid;

	let person
	try {
		person = await People.findById(personId);
	} catch (error) {
		return next(
			new HttpError(`Could not find a person for this id.`, 404)
		)
	}

	person.name = name;
	person.sector = sector;

	try {
		await person.save()
	} catch (error) {
		return next(
			new HttpError(`Something went wrong, could not update person.`, 500)
		)
	}

	res.status(200).json({ person: person.toObject({ getters: true }) })

}

const deletePerson = async (req, res, next) => {
	const personId = req.params.ppid;

	let person;
	try {
		person = await People.findById(personId);
	} catch (error) {
		return next(
			new HttpError(`Adding person failed, please try again later.`, 500)
		)
	}

	if (!person){
		return next(
			new HttpError(`Could not find person for this id.`, 404)
		)
	}

	try {
		await person.remove();
	} catch (error) {
		return next(
			new HttpError(`Could not remove the person.`, 500)
		)
	}

	res.status(200).json({ message: 'Person deleted.' })
}

/* Exports */
exports.getPeople = getPeople;
exports.getPerson = getPerson;
exports.createPerson = createPerson;
exports.updatePerson = updatePerson;
exports.deletePerson = deletePerson;