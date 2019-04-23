import { GET_ERRORS, CLEAR_ERRORS } from './types';

/**
 * Returns errors for register and login component.
 * @function
 * @param {String} msg - contains error message.
 * @param {String} status - message status error, warning and info.
 * @param {id} id - holds id of the error message. Initialized with null.
 * @returns {state} - sets GET_ERRORS state.
 */
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

/**
 * Clears errors messages by GET_ERRORS.
 * @function
 * @returns {state} - Sets CLEAR_ERRORS state.
 */
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
