/* Requires */
import express from 'express';
require('dotenv').config();
import { set, connect } from 'mongoose';

import printersRoutes from './routes/printersRoutes';
/* End */


const app = express();
set('strictQuery', true);


/* Middlewares */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept, X-Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

app.use('/api/printers', printersRoutes);
/* End */


connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pczvzsn.mongodb.net/?retryWrites=true&w=majority`)
	.then(() => {
		app.listen(process.env.PORT || 5000);
	})
	.catch(err => console.log(err));
