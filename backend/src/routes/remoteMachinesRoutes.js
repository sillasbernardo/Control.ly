/* Requires */
const { Router } = require('express');
const { check } = require('express-validator');

const remoteMachinesController = require('../controllers/remoteMachinesController');
/* Setup */
const router = Router();

/* Routes */
router.get('/', remoteMachinesController.getAllRemoteMachines);

router.get('/:rid', remoteMachinesController.getRemoteMachine);

router.post('/', [
	check('anydeskId').notEmpty(),
	check('ownerName').notEmpty(),
	check('ownerSector').notEmpty()
], remoteMachinesController.createRemoteMachine);

router.patch('/:rid', [
	check('anydeskId').notEmpty(),
	check('ownerId').notEmpty()
], remoteMachinesController.updateRemoteMachine);

router.delete('/:rid', remoteMachinesController.deleteRemoteMachine);


/* Exports */
module.exports = router;