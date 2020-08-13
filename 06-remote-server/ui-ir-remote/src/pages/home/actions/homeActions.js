import fetch from '../../../common/helpers/fetch'
import { UPDATE_ALL_COMMANDS, FETCH_ERROR } from '../reducer/homeReducer';

const transformData = (data) => {
	return data.map((datum) => {
		console.log(datum);
		const [device, oper] = datum.path.split('_');
		const operation = oper.split('-').join(' ').split('.')[0];
		return {
			...datum,
			device,
			operation
		};
	});
};

export const fetchCommands = () => (dispatch) => {
	fetch('/api/command')
		.then(({ data }) => {
			dispatch({ type: UPDATE_ALL_COMMANDS, data: transformData(data) });
		}).catch((error) => {
			console.error('Error: ', error);
			dispatch({ type: FETCH_ERROR, error: error.message });
		});
};

export const executeCommands = (command) => (_) => {
	fetch(`/api/command/${command}`)
		.then((data) => {
			console.log('done');
		}).catch((error) => {
			console.error('Error: ', error);
		});
}