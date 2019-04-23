import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: {},
  status: null,
  id: null
}

/**
 * Reduce states using the errorActions provided.
 * @function
 * @param {Object} state - contains initialState object.
 * @param {const} action - contains name of errorActions.
 * @returns - reduces states according to actions.
 */
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}