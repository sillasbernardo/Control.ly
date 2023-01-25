/* Requires */
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Task = require('../models/tasksModel');
const User = require('../models/usersModel');
const HttpError = require('../models/httpError');

/* Functions */
const getAllTasks = async (req, res, next) => {
	let tasks;
	try {
		tasks = await Task.find();
	} catch (error) {
		return next(
			new HttpError(`Could not find tasks.`, 404)
		)
	}

	res.status(200).json({ tasks: tasks.map((task) => task.toObject({ getters: true })) })
}

const getTasksByUser = async (req, res, next) => {
	const { userId } = req.body;

	let tasks;
	try {
		tasks = await Task.find({ responsiblePerson: userId });
	} catch (error) {
		return next(
			new HttpError(`Could not find tasks.`, 404)
		)
	}

	res.status(200).json({ tasks: tasks.map((task) => task.toObject({ getters: true })) })
}

const getTask = async (req, res, next) => {
	const taskId = req.params.tid;

	let task;
	try {
		task = await Task.findById(taskId);
	} catch (error) {
		return next(
			new HttpError(`Could not find task.`, 404)
		)
	}

	res.status(200).json({ task: task.toObject({ getters: true }) });
}

const createTask = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()){
		return next(
			new HttpError(`Invalid inputs passed, please try again.`, 500)
		)
	}

	let loggedInUser = "63d013bbb3aacca45623fcce";
	/* Get current logged in user id */

	const {
		title,
		description,
		responsiblePerson,
		dueDate,
		priority
	} = req.body;

	let taskOwner;
	try {
		taskOwner = await User.findById(responsiblePerson)
	} catch (error) {
		return next(
			new HttpError(`Could not find a person to attach task to.`, 404)
		)
	}

	const createdTask = new Task({
		title,
		description,
		commentsOnConclusion: "",
		creator: loggedInUser,
		responsiblePerson,
		createdDate: new Date(),
		updatedDate: null,
		dueDate,
		priority,
		status: "Pending"
	})

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdTask.save({ session: sess });
		taskOwner.tasks.push(createdTask);
		await taskOwner.save({ session: sess });
		await sess.commitTransaction();
	} catch (error) {
		return next(
			new HttpError(`Creating a new task failed. Please try again.`, 500)
		)
	}

	res.status(200).json({ task: createdTask })
}

const updateTask = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()){
		return next(
			new HttpError(`Invalid inputs passed, please try again.`, 500)
		)
	}

	const taskId = req.params.tid;
	const {
		title,
		description,
		responsiblePerson,
		commentsOnConclusion,
		dueDate,
		priority,
		status
	} = req.body;

	let loggedInUser = "63d013bbb3aacca45623fcce"; // Mike
	/* Check if loggedInUser is creator */

	let task;
	try {
		task = await Task.findById(taskId).populate('responsiblePerson', '-password');
	} catch (error) {
		return next(
			new HttpError(`Could not find task.`, 404)
		)
	}

	if (loggedInUser === task.creator.toString()){

		if (task.responsiblePerson.id != responsiblePerson){
			try {
				task.responsiblePerson.tasks.pull(task.id);
				task.responsiblePerson.save();
			} catch (error) {
				return next(
					new HttpError(`Error while removing tasks from old responsible person.`, 500)
				)
			}
		}

		task.title = title;
		task.description = description;
		task.responsiblePerson = responsiblePerson;
		task.commentsOnConclusion = commentsOnConclusion;
		task.dueDate = dueDate;
		task.priority = priority;
		task.status = status;

		let currentResponsiblePerson;
		try {
			currentResponsiblePerson = await User.findById(task.responsiblePerson.toString());
		} catch (error) {
			return next(
				new HttpError(`Could not find old responsible person.`, 404)
			)
		}

		try {
			const sess = await mongoose.startSession();
			sess.startTransaction();
			await task.save({ session: sess });
			currentResponsiblePerson.tasks.push(task);
			await currentResponsiblePerson.save({ session: sess });
			await sess.commitTransaction();
		} catch (error) {
			return next(
				new HttpError(`Updating task failed, please try again.`, 500)
			)
		}

	} else {
		task.commentsOnConclusion = commentsOnConclusion;
		task.status = status;

		try {
			await task.save();
		} catch (error) {
			return next(
				new HttpError(`Updating task failed, please try again.`, 500)
			)
		}
	}

	res.status(200).json({ task: task })
}

const deleteTask = async (req, res, next) => {
	const taskId = req.params.tid;

	let task;
	try {
		task = await Task.findById(taskId).populate('responsiblePerson', '-password');
	} catch (error) {
		return next(
			new HttpError(`Could not find task.`, 404)
		)
	}

	let loggedInUser = "63d013bbb3aacca45623fcce";
	/* Check if loggedin user is the creator */

	if (loggedInUser === task.creator.toString()){
		try {
			const sess = await mongoose.startSession();
			sess.startTransaction();
			await task.remove({ session: sess });
			task.responsiblePerson.tasks.pull(task);
			await task.responsiblePerson.save({ session: sess });
			await sess.commitTransaction()
		} catch (error) {
			return next(
				new HttpError(`Could not delete task.`, 500)
			)
		}
	
		res.status(200).json({ message: 'Task deleted.' })

	} else {
		res.status(401).json({ message: 'You are not authorized to delete this task' })
	}
}

/* Exports */
exports.getAllTasks = getAllTasks;
exports.getTask = getTask;
exports.getTasksByUser = getTasksByUser;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;