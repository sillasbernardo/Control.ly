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
	check('name').notEmpty(), // Throw error if name is not empty
	check('ip').notEmpty() // Throw error if ip is not empty
], printersController.createPrinter);

router.patch('/:pid', [
	check('name').notEmpty(), // Throw error if name is not empty
	check('ip').notEmpty() // Throw error if ip is not empty
], printersController.updatePrinter);

router.delete('/:pid', printersController.deletePrinter);

/* Exports */
module.exports = router;