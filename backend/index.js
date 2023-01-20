/* Requires */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

/* Setup */
const app = express();
mongoose.set('strictQuery', true);
dotenv.config();

/* Connect */
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pczvzsn.mongodb.net/?retryWrites=true&w=majority`)
	.then(() => {
		app.listen(process.env.PORT | 5000, console.log('Server started on port 5000'));
	})