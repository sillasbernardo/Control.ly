/* Imports */
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import printerRoutes from "./routes/printersRoutes";

/* First setup */
const app = express();
mongoose.set('strictQuery', true);
dotenv.config();

/* Middlewares */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept, X-Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

app.use('/api/printers', printerRoutes);

/* Connect */
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pczvzsn.mongodb.net/?retryWrites=true&w=majority`)
	.then(() => {
		app.listen(process.env.PORT || 5000);
		console.log('Server started')
	})
	.catch(err => console.log(err));