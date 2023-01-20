/* Requires */
const { Router } = require('express');
const { check } = require('express-validator');

const printersController = require('../controllers/printersController');

/* Setup */
const router = Router();

/* Routes */
router.get('/', printersController.getAllPrinters);

router.get('/:pid', printersController.getPrinter);

router.post('/', [
	check('name').not().isEmpty(), // Throw error if name is not empty
	check('ip').not().isEmpty() // Throw error if ip is not empty
], printersController.createPrinter);

router.patch('/:pid', [
	check('name').not().isEmpty(), // Throw error if name is not empty
	check('ip').not().isEmpty() // Throw error if ip is not empty
], printersController.updatePrinter);

router.delete('/:pid', printersController.deletePrinter);

/* Exports */
module.exports = router;