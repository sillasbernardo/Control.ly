/* Imports */
import { Request, Response } from "express";
import * as snmp from "net-snmp";

import Printer from "../models/printersModel";

/* CRUD Operation */
const getAllPrinters = (req:Request, res:Response, next:any) => {
	res.send('Printers')
}

const getPrinter = (req:Request, res:Response, next:any) => {
	
}

const createPrinter = (req:Request, res:Response, next:any) => {

}

const updatePrinter = (req:Request, res:Response, next:any) => {

}

const deletePrinter = (req:Request, res:Response, next:any) => {

}

/* Exports */
export {
	getAllPrinters,
	getPrinter,
	createPrinter,
	updatePrinter,
	deletePrinter
}