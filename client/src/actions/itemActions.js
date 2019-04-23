import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

/**
 * Gets Movie Items from the server.
 * @function
 * @returns dispatch - returns the movie items with payload.
 */
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/**
 * Action to add a movie item to the database.
 * @function
 * @param {String} item - an instance of ItemSchema.
 * @returns {tuple} - Tuple of dispatch and current state objects.
 */
export const addItem = item => (dispatch, getState) => {
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/**
 * Action to delete item from the database.
 * @function
 * @param {id} id - instance identifier which is to be deleted
 * @returns {tuple} - Tuple of dispatch and current state.
 */
export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/**
 * Initializes state when Items are loading.
 * @function
 */
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
