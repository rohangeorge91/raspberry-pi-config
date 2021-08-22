import fs, { Dirent } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getValue } from './data';

// path to the ir-codes files.
const irCodes = getValue(process.env.ir_codes_path, '../../../../ir-codes');
const irCodesFolderName = irCodes.substr((irCodes.lastIndexOf('/') + 1));
const irCodePath = path.join(__dirname, irCodes);

/**
 * Return a dictionary which stores file and folders as an array of paths
 * @param file an array with the initial file path in the structure
 * @param folder an array with the initial folder path in the structure
 * @returns a dictionary with array of files and folder paths
 */
const createDirectory = (file: StringArray = [], folder: StringArray = []): FileDirectory => ({ file, folder });

/**
 * Returns folder if the given location is a directory else file.
 * @param location the direct object
 * @returns a string which tells if folder or file
 */
const locationType = (location: Dirent): LocationType => location.isDirectory() ? 'folder' : 'file'

/**
 * Returns a dictionary with folder and file.
 * @param acc the old dictionary with the folder and file keys
 * @param key the location type of the path
 * @param value the string location of the file or folder.
 * @returns a dictionary with file and folder.
 */
const prepareDirectoryMap = (acc: FileDirectory, key: LocationType, value: string): FileDirectory => ({
	...acc,
	[key]: acc[key].concat(value)
});

/**
 * Returns a list of files on a given directory and sub-directory using recursion.
 * @param directory the directory which is being searched.
 */
const pathSearch = (directory: string): StringArray => {
	const { file, folder } = fs.readdirSync(directory, { withFileTypes: true })
		.reduce((acc, location) =>
			prepareDirectoryMap(acc, locationType(location), `${directory}/${location.name}`), createDirectory());
	const allFiles = folder
		.map((location) => pathSearch(location))
		.reduce((acc: StringArray, value: StringArray) => acc.concat(value), []);
	return file.concat(allFiles);
};

/**
 * Returns all the list of files from a given directory.
 * @param currentPath the directory which is being searched.
 */
const recursiveFileSearch = (currentPath: string) => pathSearch(currentPath);

/**
 * Get the list of all commands for the ir-remote.
 */
export const getCommands = new Promise((resolve, reject) => {
	try {
		const commands = recursiveFileSearch(irCodePath).map((result) => {
			const subPath = result.split(irCodesFolderName + '/')[1];
			const codes = subPath.split('/');
			return { path: codes.join('_'), codes };
		});
		resolve(commands);
	} catch(err) {
		reject(err);
	}
});

/**
 * 
 * @param {*} status 
 * @param {*} message 
 * @returns 
 */
const responseObj = (status, message) => ({ status, message })

/**
 * Execute the command for the ir-remote
 * @param {String} command the command which is to be executed.
 */
export const executeCommand = (command) => new Promise((resolve, reject) => {
	try {
		const finalCommand = `bto_advanced_USBIR_cmd -d \`cat ${irCodePath}/${command.split('_').join('/')}\``;
		execSync(finalCommand);
		resolve(responseObj('ok', 'Command was executed'));
	} catch (ex) {
		reject(responseObj('error', 'Command had issues will executing'));
	}
});
