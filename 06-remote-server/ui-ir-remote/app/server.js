const express = require('express');
const app = express();
const path = require('path');

const { getCommands, disableClientCaching, executeCommand } = require('./helpers');

const LOCAL_DEV = 'LOCAL-DEV';
const ENVIRONMENT = process.env.ENVIRONMENT ? process.env.ENVIRONMENT : 'DEV';
const PORT = process.env.PORT ? process.env.PORT : 8080;

const SERVER_ROOT = path.join(__dirname, '..');

// if not dev then compress the response and minify the content.
if (ENVIRONMENT !== LOCAL_DEV) {
	// compresses and minify the response from the server in production.
	const compression = require('compression');
	const minify = require('express-minify');
	// kept it two steps to make it more readable.
	app.use(compression());
	app.use(minify());
}

app.get('/api/command/:command', (req, res) => {
	disableClientCaching(res);
	executeCommand(req.params.command).then((data) => {
		res.type('application/json').send(JSON.stringify(data))
	}).catch((err) => {
		console.error('Issue with execution of the command.', err);
		res.status(500).send(err);
	});
});

app.get('/api/command', (_, res) => {
	disableClientCaching(res);
	getCommands().then((data) => {
		res.type('application/json').send(JSON.stringify(data))
	}).catch((err) => {
		console.error('Error: ', err);
		res.status(500).send('Error: Configurations for the server not found. Contact the admin');
	});
});

if (ENVIRONMENT === LOCAL_DEV) {
	// redirect everything else to the static webpack server on local.
	const { createProxyMiddleware } = require('http-proxy-middleware');
	app.use(createProxyMiddleware({
		target: 'http://localhost:3000',
		changeOrigin: true
	}));
} else {
	// The below will redirect all static request to either /build folder in PROD/QA/DEV
	app.use(express.static(path.join(SERVER_ROOT, 'build'), {
		maxAge: '30 days'
	}));
}

app.listen(PORT, () => {
	console.log(`The Server was started on port ${PORT}`);
});
