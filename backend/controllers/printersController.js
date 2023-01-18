/* Requires */
const Printer = require('../models/printerModel');
const HttpError = require('../models/http-error');
/* End */


/* CRUD Functions */
const getAllPrinters = (req, res, next) => {
	res.send('Get all printers');
}

const getPrinter = (req, res, next) => {
	res.send('Get a printer');
}

const createPrinter = (req, res, next) => {
	res.send('Create printer');
}

const updatePrinter = (req, res, next) => {
	res.send('Update printer');
}

const deletePrinter = (req, res, next) => {
	res.send('Delete printer');
}
/* End */


/* Exports */
exports.getAllPrinters = getAllPrinters;
exports.getPrinter = getPrinter;
exports.createPrinter = createPrinter;
exports.updatePrinter = updatePrinter;
exports.deletePrinter = deletePrinter;
/* End */