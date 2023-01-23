/* Requires */
const { validationResult } = require('express-validator');

const HttpError = require('../models/httpError');
const Printer = require('../models/printersModel')

/* Functions */
const getAllPrinters = async (req, res, next) => {
	let printers;

	try {
		printers = await Printer.find();
	} catch (error) {
		return next(
			new HttpError(`Could not find printers.`, 404)
		)
	}

	res.status(200).json({ printers: printers.map((printer) => printer.toObject({ getters: true })) })
}

const getPrinter = async (req, res, next) => {
	const printerId = req.params.pid;

	let printer;
	try{
		printer = await Printer.findById(printerId);
	} catch (error){
		return next(
			new HttpError(`Something went wrong, could not find printer.`, 500)
		)
	}

	if (!printer){
		return next(
			new HttpError(`Could not find a printer for the provided id.`, 404)
		)
	}

	res.status(200).json({ printer: printer.toObject({ getters: true })	})
}

const createPrinter = async (req, res, next) => {
	// Check for errors in request
	const error = validationResult(req);
	if (!error.isEmpty){
		return next(
			new HttpError(`Invalid inputs passed, please check your data.`, 422)
		);
	}

	const {	name,	ip } = req.body;

	// Check if printer exists
	let existingPrinter;
	try {
		existingPrinter = await Printer.findOne({ ip: ip })
	} catch (error) {
		return next(
			new HttpError('Adding new printer failed, please try again later.', 500)
		)
	}

	if (existingPrinter){
		return next(
			new HttpError(`Printer already exists.`, 422)
		)
	}

	// Create a printer instance
	const newPrinter = new Printer({ name, ip })

	try {
		await newPrinter.save();
	} catch (error) {
		return next(
			new HttpError('Adding new printer failed, please try again later.', 500)
		)
	}

	res.status(201).json({ printer: newPrinter })

}

const updatePrinter = async (req, res, next) => {
	const error = validationResult(req);

	// Check for errors in request
	if (!error.isEmpty){
		return next(
			new HttpError(`Invalid inputs passed, please check your data.`, 422)
		)
	}

	const { name, ip } = req.body;
	const printerId = req.params.pid;

	let printer;
	try {
		printer = await Printer.findById(printerId);
	} catch (error) {
		return next(
			new HttpError(`Something went wrong, please try again later.`, 422)
		)
	}

	printer.name = name;
	printer.ip = ip;

	try {
		await printer.save();
	} catch (error) {
		return next(
			new HttpError(`Something went wrong, could not update printer.`, 500)
		)
	}

	res.status(200).json({ printer: printer.toObject({ getters: true }) })
}

const deletePrinter = async (req, res, next) => {
	const printerId = req.params.pid;

	let printer;
	try {
		printer = await Printer.findById(printerId);
	} catch (error) {
		return next(
			new HttpError(`Something went wrong, please try again later.`, 500)
		)
	}

	if (!printer){
		return next(
			new HttpError(`Could not find printer for this id.`, 404)
		)
	}

	try {
		await printer.remove();
	} catch (error) {
		return next(
			new HttpError(`Something went wrong, could not remove printer.`, 500)
		)
	}

	res.status(200).json({ message: 'Printer deleted.' })
}

/* Exports */
exports.getAllPrinters = getAllPrinters;
exports.getPrinter = getPrinter;
exports.createPrinter = createPrinter;
exports.updatePrinter = updatePrinter;
exports.deletePrinter = deletePrinter;