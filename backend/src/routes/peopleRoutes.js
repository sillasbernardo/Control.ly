/* Requires */
const { Router } = require('express');
const { check } = require('express-validator');

const peopleController = require('../controllers/peopleController');

/* Setup */
const router = Router();

/* Routes */
router.get('/', peopleController.getPeople);

router.get('/:ppid', peopleController.getPerson);

router.post('/', [
	check('name').notEmpty(),
	check('sector').notEmpty(),
], peopleController.createPerson);

router.patch('/:ppid', [
	check('name').notEmpty(),
	check('sector').notEmpty(),
], peopleController.updatePerson);

router.delete('/:ppid', peopleController.deletePerson);

/* Exports */
module.exports = router;