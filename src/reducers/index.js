import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import authReducer from './auth_reducer';

const reducers = {
    form: formReducer,
    auth: authReducer
}

const reducer = combineReducers(reducers);

export default reducer;
