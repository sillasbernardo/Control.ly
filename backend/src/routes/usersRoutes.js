/* Requires */
const { Router } = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/usersController');

/* Setup */
const router = Router();

/* Routes */
router.get('/', usersController.getAllUsers);

router.get('/:uid', usersController.getUser);

router.post('/',
	check('photoPath').notEmpty(),
	check('name').notEmpty(),
	check('role').notEmpty(),
	check('password').isLength({ min: 8 }).withMessage('Must be a least 8 characters long')
	, usersController.createUser);

router.patch('/:uid', [
	check('photoPath').notEmpty(),
	check('name').notEmpty(),
	check('role').notEmpty(),
	check('password').isLength({ min: 8 }).withMessage('Must be a least 8 characters long')
], usersController.updateUser);

router.delete('/:uid', usersController.deleteUser);

/* Exports */
module.exports = router;