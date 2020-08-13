export const UPDATE_ALL_COMMANDS = '@homePage/UPDATE_ALL_COMMANDS';
export const FETCH_ERROR = '@homePage/FETCH_ERROR';
export const VIEWED_LAST_ERROR = '@homePage/VIEWED_LAST_ERROR';

const INITIAL_STATE = {
	commands: [],
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
		default:
			return state;
	}
}

export default reducer;