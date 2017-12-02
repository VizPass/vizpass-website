import { getDeletedWait } from './selectors';
import { waitList } from './wait-list';
import {
  CREATE_WAIT_ERROR,
  CREATE_WAIT_SUCCESS,
  REMOVE_WAIT_ERROR,
  REMOVE_WAIT_SUCCESS,
  FILTER_WAITS,
  LOAD_WAITS_SUCCESS,
  UNDELETE_WAIT_ERROR,
  UNLOAD_WAITS_SUCCESS,
  UPDATE_WAIT_ERROR,
  UPDATE_WAIT_SUCCESS
} from './action-types';


export function createWait(title) {
  return dispatch => {
    waitList.push({completed: false, title})
      .catch(error => dispatch(createWaitError(error)));
  };
}

export function createWaitError(error) {
  return {
    type: CREATE_WAIT_ERROR,
    payload: error
  };
}

export function createWaitSuccess(wait) {
  return {
    type: CREATE_WAIT_SUCCESS,
    payload: wait
  };
}

export function removeWait(wait) {
  return dispatch => {
    waitList.remove(wait.key)
      .catch(error => dispatch(removeWaitError(error)));
  };
}

export function removeWaitError(error) {
  return {
    type: REMOVE_WAIT_ERROR,
    payload: error
  };
}

export function removeWaitSuccess(wait) {
  return {
    type: REMOVE_WAIT_SUCCESS,
    payload: wait
  };
}

export function undeleteWait() {
  return (dispatch, getState) => {
    const wait = getDeletedWait(getState());
    if (wait) {
      waitList.set(wait.key, {completed: wait.completed, title: wait.title})
        .catch(error => dispatch(undeleteWaitError(error)));
    }
  };
}

export function undeleteWaitError(error) {
  return {
    type: UNDELETE_WAIT_ERROR,
    payload: error
  };
}

export function updateWaitError(error) {
  return {
    type: UPDATE_WAIT_ERROR,
    payload: error
  };
}

export function updateWait(wait, changes) {
  return dispatch => {
    waitList.update(wait.key, changes)
      .catch(error => dispatch(updateWaitError(error)));
  };
}

export function updateWaitSuccess(wait) {
  return {
    type: UPDATE_WAIT_SUCCESS,
    payload: wait
  };
}

export function loadWaitsSuccess(waits) {
  return {
    type: LOAD_WAITS_SUCCESS,
    payload: waits
  };
}

export function filterWaits(filterType) {
  return {
    type: FILTER_WAITS,
    payload: {filterType}
  };
}

export function loadWaits() {
  return (dispatch, getState) => {
    const { auth } = getState();
    waitList.path = `waits/${auth.id}`;
    waitList.subscribe(dispatch);
  };
}

export function unloadWaits() {
  waitList.unsubscribe();
  return {
    type: UNLOAD_WAITS_SUCCESS
  };
}
