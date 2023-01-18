/* Requires */
import { Router } from 'express';
import { check } from 'express-validator';

const router = Router();
import { getAllPrinters, getPrinter, createPrinter, updatePrinter, deletePrinter } from '../controllers/printersController';
/* End */

/* Routes */
router.get('/', getAllPrinters);

router.get('/:pid', getPrinter);

router.post('/', createPrinter);

router.patch('/:pid', updatePrinter);

router.delete('/:pid', deletePrinter);
/* End */

/* Exports */
export default router;
/* End */