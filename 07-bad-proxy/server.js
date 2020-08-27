const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = 9000;

const proxy = httpProxy.createProxyServer({
	target: '192.168.50.144:9000',
	changeOrigin: true
});

app.all('*', (req, res) => {
	try {
		proxy.web(req, res);
	} catch (ex) {
		console.error('opps!', ex);
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});