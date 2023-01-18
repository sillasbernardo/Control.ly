/* Requires */
import Printer from '../models/printerModel';
import HttpError from '../models/http-error';
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
export {
	getAllPrinters,
	getPrinter,
	createPrinter,
	updatePrinter,
	deletePrinter
}
/* End */