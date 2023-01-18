/* Requires */
const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const printersController = require('../controllers/printersController');
/* End */

/* Routes */
router.get('/', printersController.getAllPrinters);

router.get('/:pid', printersController.getPrinter);

router.post('/', printersController.createPrinter);

router.patch('/:pid', printersController.updatePrinter);

router.delete('/:pid', printersController.deletePrinter);
/* End */

/* Exports */
module.exports = router;
/* End */