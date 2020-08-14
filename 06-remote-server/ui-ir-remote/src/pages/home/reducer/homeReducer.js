export const UPDATE_ALL_COMMANDS = '@homePage/UPDATE_ALL_COMMANDS';
export const FILTER_ALL_COMMANDS = '@homePage/FILTER_ALL_COMMANDS';
export const CHANGE_FILTER_TEXT = '@homePage/CHANGE_FILTER_TEXT';
export const FETCH_ERROR = '@homePage/FETCH_ERROR';
export const VIEWED_LAST_ERROR = '@homePage/VIEWED_LAST_ERROR';

const INITIAL_STATE = {
	commands: [],
	filteredCommands: [],
	filterText: '',
	lastUpdate: new Date(1970, 0, 1),
	error: {
		timestamp: new Date(1970, 0, 1),
		lastErrorViewed: false,
		errorMsg: ''
	}
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_ALL_COMMANDS: {
			return {
				...state,
				commands: action.data,
				filteredCommands: action.data,
				filterText: '',
				lastUpdate: new Date()
			};
		}
		case FETCH_ERROR: {
			const now = new Date();
			return {
				...state,
				error: {
					timestamp: now,
					lastErrorViewed: true,
					errorMsg: action.error
				},
				lastUpdate: now
			}
		}
		case VIEWED_LAST_ERROR: {
			return {
				...state,
				error: {
					...state.error,
					lastErrorViewed: false
				}
			}
		}
		case CHANGE_FILTER_TEXT: {
			return {
				...state,
				filterText: action.data
			};
		}
		case FILTER_ALL_COMMANDS: {
			const regex = new RegExp(state.filterText, 'i');
			const matchedCommands = state.commands.filter(({ path }) => path.match(regex));

			return {
				...state,
				filteredCommands: matchedCommands
			}
		}
		default:
			return state;
	}
}

export default reducer;