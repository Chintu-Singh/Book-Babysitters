if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = require('./server/app');
const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Express server is up on port ${port}`);
});
