import express from 'express';
import path from 'path';
import compression from 'compression';
import minify from 'express-minify';
import { createProxyMiddleware } from 'http-proxy-middleware';
import routes from './api';

const app = express();

const DEV = 'DEV';
const ENVIRONMENT = process.env.ENVIRONMENT ? process.env.ENVIRONMENT : DEV;
const PORT = process.env.PORT ? process.env.PORT : 8081;
const SERVER_ROOT = path.join(__dirname, '..');

const proxyConfig = (target: string, changeOrigin: boolean, ws: boolean) => ({ target, changeOrigin, ws })

if (ENVIRONMENT === DEV) {
	routes(app)
	app.use(createProxyMiddleware(proxyConfig('http://localhost:3000', true, true)));
} else {
	app.use(compression());
	app.use(minify());
	routes(app)
	// redirect all static request
	app.use(express.static(path.join(SERVER_ROOT, 'build'), { maxAge: '30 days' }));
}

app.listen(PORT, () => {
	console.log(`The Server was started on port ${PORT}`);
});

export default app;
