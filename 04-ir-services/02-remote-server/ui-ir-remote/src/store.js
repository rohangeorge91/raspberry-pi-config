import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { isEnvironmentDev } from './common/helpers/env';
import homeReducer from './pages/home/reducer/homeReducer';

let enhancer;
const middleware = [thunk];

if (isEnvironmentDev()) {
	const reduxLogger = createLogger({ collapsed: true });
	const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actihistoryhistoryhistoryonsBlacklist, actionsCreators, serialize...
		}) : compose;
	middleware.push(reduxLogger);
	enhancer = composeEnhancers(applyMiddleware(...middleware));
} else {
	// on production don't use REDUX_DEVTOOLS
	enhancer = compose(applyMiddleware(...middleware));
}

const appReducers = () => {
	return combineReducers({
		home: homeReducer
	});
};

const store = createStore(
	appReducers(),
	// we can introduce offline mode where we store the entire state as a file and then ask customer to upload it.
	enhancer,
);

export default store;
