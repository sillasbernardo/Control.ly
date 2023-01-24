/* Requires */
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/httpError');
const User = require('../models/usersModel');

/* Functions */
const getAllUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find();
	} catch (error) {
		return next(
			new HttpError(`Could not find users.`, 500)
		)
	}

	res.status(200).json({ users: users.map(user => {
		return {
			userId: user.id,
			photoPath: user.photoPath,
			name: user.name,
			role: user.role,
			tasks: user.tasks
		}
	}) })
}

const getUser = async (req, res, next) => {
	const userId = req.params.uid;
	
	let user;
	try {
		user = await User.findById(userId);
	} catch (error) {
		return next(
			new HttpError(`Error on processing user's data.`, 500)
		)
	}

	if (!user){
		return next(
			new HttpError(`Could not find user.`, 404)
		)
	}

	res.status(200).json({ userId: user.id, photoPath: user.photoPath, name: user.name, role: user.role, tasks: user.tasks })
}

const createUser = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()){
		return next(
			new HttpError(`Invalid inputs passed. Please try again.`, 500)
		)
	}

	/* Check if logged user is admin */

	const { photoPath, name, role, password } = req.body;

	let user;
	try {
		user = await User.findOne({ name: name });
	} catch (error) {
		return next(
			new HttpError(`Error on processing user information, please try again later.`, 500)
		)
	}

	if (user){
		return next(
			new HttpError(`User already exists.`, 422)
		)
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (error) {
		return next(
			new HttpError(`Error on creating user, please try again.`, 500)
		)
	}

	const createdUser = new User({ photoPath, name, role, password: hashedPassword });

	try {
		await createdUser.save();
	} catch (error) {
		return next(
			new HttpError(`Error on creating new user, please try again`, 500)
		)
	}

	res.status(200).json({ user: createdUser.name, role: createdUser.role })
}

const updateUser = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		return next(
			new HttpError(`Invalid inputs passed, please try again`, 500)
		)
	}

	const userId = req.params.uid;
	const { photoPath, name, role, password } = req.body;

	let user;
	try {
		user = await User.findById(userId);
	} catch (error) {
		return next(
			new HttpError(`Could not find user.`, 404)
		)
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (error) {
		return next(
			new HttpError(`Error on updating user's data.`, 500)
		)
	}

	let loggedInUserRole = "User";
	/* 
		Check if logged in user is admin 
	*/

	if (loggedInUserRole === "Administrator"){
		user.photoPath = photoPath;
		user.name = name;
		user.role = role;
		user.password = hashedPassword;

		try {
			await user.save();
		} catch (error) {
			return next(
				new HttpError(`Could not update user.`, 500)
			)
		}
	} else {
		user.photoPath = photoPath;
		user.name = name;
		user.password = hashedPassword;

		try {
			await user.save();
		} catch (error) {
			return next(
				new HttpError(`Could not update user.`, 500)
			)
		}
	}

	res.status(200).json({ photoPath: user.photoPath, name: user.name, role: user.role })

}

const deleteUser = async (req, res, next) => {
	const userId = req.params.uid;

	let loggedInUserRole = "Administrator";
	/* Check if loggedin user is admin */
	if (loggedInUserRole === "Administrator"){
		let user;
		try {
			user = await User.findById(userId);
		} catch (error) {
			return next(
				new HttpError(`Could not find user.`, 404)
			)
		}

		try {
			await user.remove();
		} catch (error) {
			return next(
				new HttpError(`Error while deleting user. Try again later.`, 500)
			)
		}
	} else {
		return next(
			new HttpError(`You are not authorized to delete users.`, 401)
		)
	}

	res.status(200).json({ message: "User deleted." })
}

/* Exports */
exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;