import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

/**
 * All the reducers are combined.
 * @function
 */
export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer
});
