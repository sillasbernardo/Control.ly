/* Requires */
const { Router } = require('express');
const { check } = require('express-validator');

const tasksController = require('../controllers/tasksController');

/* Setup */
const router = Router();

/* Routes */
router.get('/', tasksController.getAllTasks);

router.get('/:tid', tasksController.getTask);

router.post('/byUser', tasksController.getTasksByUser);

router.post('/', [
	check('title', 'Title cannot be empty.').notEmpty(),
	check('description', 'Description cannot be empty.').notEmpty(),
	check('responsiblePerson', 'Responsible person cannot be empty.').notEmpty(),
	check('dueDate', 'Due date cannot be empty.').notEmpty().toDate(),
	check('priority', 'Priority cannot be empty.').notEmpty().toInt()
], tasksController.createTask);

router.patch('/:tid', [
	check('title', 'Title cannot be empty.').notEmpty(),
	check('description', 'Description cannot be empty.').notEmpty(),
	check('responsiblePerson', 'Responsible person cannot be empty.').notEmpty(),
	check('dueDate', 'Due date cannot be empty.').notEmpty().toDate(),
	check('priority', 'Priority cannot be empty.').notEmpty().toInt(),
	check('commentsOnConclusion', "Comments cannot be empty.").notEmpty(),
	check('status', 'Status cannot be empty.').notEmpty()
],tasksController.updateTask);

router.delete('/:tid', tasksController.deleteTask);

/* Exports */
module.exports = router;