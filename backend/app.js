/* Requires */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const printersRoutes = require('./src/routes/printersRoutes');
const peopleRoutes = require('./src/routes/peopleRoutes');
const remoteMachinesRoutes = require('./src/routes/remoteMachinesRoutes');
const HttpError = require('./src/models/httpError');

/* Setup */
const app = express();
mongoose.set('strictQuery', true);
dotenv.config();

/* Middlewares */
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept, X-Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
})

app.use('/api/printers', printersRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/remotes/profiles', remoteMachinesRoutes);

app.use((req, res, next) => {
	throw new HttpError(`Could not find this route.`, 404);
})

/* Connect */
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pczvzsn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
	.then(() => {
		app.listen(process.env.PORT || 5000, console.log('Server is running on port 5000'));
	})
	.catch(err => console.log(err));