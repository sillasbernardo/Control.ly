/* Requires */
const express = require('express');

const app = express();
const printersRoutes = require('./routes/printersRoutes');
/* End */

/* Middlewares */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept, X-Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

app.use('/api/printers', printersRoutes);
/* End */

app.listen(process.env.PORT || 5000, console.log(`Server running on port 5000`));