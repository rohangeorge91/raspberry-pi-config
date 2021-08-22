import { Express, Request, Response } from 'express'
import { getCommands, executeCommand } from './helpers/file';

/**
 * Modifies the response header to disable caching on the client-side.
 * @param _ the request which is received from the server.
 * @param response which is going to be send from the server.
 * @param next the function which is called next
 */
const disableClientCaching = (_: Request, response: Response, next: Function) => {
	response.setHeader('Surrogate-Control', 'no-store');
	response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
	response.setHeader('Pragma', 'no-cache');
	response.setHeader('Expires', '0');
	next();
};

/**
 * Modifies the response to set the response type as json.
 * @param _ the request which is received from the server.
 * @param response which is going to be send from the server.
 * @param next the function which is called next
 */
const setJsonResponseType = (_: Request, response: Response, next: Function) => {
	response.type('application/json');
	next();
}

/**
 * Returns an error Response JSON.
 * @param message the error message which is sent back
 * @returns An error response JSON.
 */
const errorResponse = (message: string) => ({ message })

/**
 * Sets the API routes to the Express Framework.
 * @param app The Express Framework instance
 */
const routes = (app: Express) => {
	// execute command
	app.get('/api/command/:command', (req: Request, res: Response, next: Function) => {
		
		executeCommand(req.params.command).then((data) => {
			res.status(200).send(data);
		}).catch((err) => {
			console.error('Issue with execution of the command.', err);
			res.status(500).send(errorResponse('can\'t execute ir command.'));
		});
		next();
	});
	// fetch commands
	app.get('/api/command', (_: Request, res: Response, next: Function) => {
		const commands = recursiveFileSearch(irCodePath).map((result) => {
			const subPath = result.split(irCodesFolderName + '/')[1];
			const codes = subPath.split('/');
			return { path: codes.join('_'), codes };
		});
		getCommands().then((data) => {
			res.status(200).send(data);
		}).catch((err) => {
			console.error('Issues while fetching the commands: ', err);
			res.status(500).send(errorResponse('can\'t fetch ir commands'));
		});
		next();
	});
	// all API response is not cached and json
	app.use(disableClientCaching)
	app.use(setJsonResponseType)
}

export default routes;