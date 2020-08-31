const path = require('path');
const fs = require('fs');
const { exec, execSync } = require("child_process");

//path to the ir-codes files.
const irCodes = 'ir-codes';
const irCodePath = path.join(__dirname, '..', '..', '..', irCodes);

/**
 * Returns all the list of files from a given directory.
 * @param {String} currentPath the directory which is being searched.
 */
const recursiveFileSearch = (currentPath) => {
	/**
	 * Returns a list of files on a given directory and sub-directory using recursion.
	 * @param {String} directory the directory which is being searched.
	 */
	const pathSearch = (directory) => {
		const otherPaths = fs.readdirSync(directory, { withFileTypes: true });
		const folders = otherPaths.filter((location) => location.isDirectory());
		const files = otherPaths.filter((location) => !location.isDirectory()).map((file) => {
			const filePath = `${directory}/${file.name}`;
			return filePath;
		});
		const allFiles = folders
			.map((folder) => pathSearch(`${directory}/${folder.name}`))
			.reduce((acc, value) => acc.concat(value), []);
		return files.concat(allFiles);
	};
	return pathSearch(currentPath);
};

/**
 * Get the list of all commands for the ir-remote.
 */
const getCommands = () => {
	return new Promise((resolve) => {
		let commands = recursiveFileSearch(irCodePath).map((result) => {
			const subPath = result.split(irCodes + '/')[1];
			const codes = subPath.split('/')
			return {
				path: codes.join('_'),
				codes
			}
		});
		resolve(commands);
	});
};

/**
 * Execute the command for the ir-remote
 * @param {String} command the command which is to be executed.
 */
const executeCommand = (command) => {
	return new Promise((resolve, reject) => {
		try {
			const finalCommand = `bto_advanced_USBIR_cmd -d \`cat ${irCodePath}/${command.split('_').join('/')}\``;
			execSync(finalCommand);
			resolve({
				status: 'ok',
				message: 'Command was executed'
			});
		} catch (ex) {
			reject({
				status: 'error',
				message: 'Command had issues will executing'
			});
		}
	});
};

/**
 * Modifies the response header to disable caching on the client-side.
 * NOTE: this is useful to ensure that dynamically created resources like index.html & app-env.js are not cached.
 *
 * @param {ResponseObj} response which is going to be send from the server.
 */
const disableClientCaching = (response) => {
	response.setHeader('Surrogate-Control', 'no-store');
	response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
	response.setHeader('Pragma', 'no-cache');
	response.setHeader('Expires', '0');
};

module.exports = {
	disableClientCaching,
	getCommands,
	executeCommand
};
