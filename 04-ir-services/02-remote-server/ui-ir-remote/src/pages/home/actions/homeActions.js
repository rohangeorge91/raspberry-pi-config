import fetch from '../../../common/helpers/fetch'
import { UPDATE_ALL_COMMANDS, FETCH_ERROR, CHANGE_FILTER_TEXT, FILTER_ALL_COMMANDS } from '../reducer/homeReducer';

const transformData = (data) => {
	return data.map((datum) => {
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
			console.log(data);
		}).catch((error) => {
			console.error('Error: ', error);
		});
};

export const filterCommands = () => (dispatch) => {
	dispatch({ type: FILTER_ALL_COMMANDS });
};

export const filterText = (searchText) => (dispatch) => {
	dispatch({ type: CHANGE_FILTER_TEXT, data: searchText });
};