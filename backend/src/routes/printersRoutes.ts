/* Imports */
import { Router } from "express";

import {
	getAllPrinters,
	getPrinter,
	updatePrinter,
	createPrinter,
	deletePrinter
} from "../controllers/printersController";

/* Routes */
const router = Router();

router.get('/', getAllPrinters);

router.get('/:pid', getPrinter);

router.post('/', createPrinter);

router.patch('/:pid', updatePrinter);

router.delete('/:pid', deletePrinter);

/* Exports */
export default router;