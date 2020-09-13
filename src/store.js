import { TreatmentReducer } from './reducers/TreatmentReducer';
import { CalendarReducer } from './reducers/CalendarReducer';
import { EmailReducer } from './reducers/EmailReducer';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    TreatmentReducer,
    CalendarReducer,
    EmailReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));