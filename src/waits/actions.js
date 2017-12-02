import { getDeletedTask } from './selectors';
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


export function createTask(title) {
  return dispatch => {
    waitList.push({completed: false, title})
      .catch(error => dispatch(createTaskError(error)));
  };
}

export function createTaskError(error) {
  return {
    type: CREATE_WAIT_ERROR,
    payload: error
  };
}

export function createTaskSuccess(wait) {
  return {
    type: CREATE_WAIT_SUCCESS,
    payload: wait
  };
}

export function removeTask(wait) {
  return dispatch => {
    waitList.remove(wait.key)
      .catch(error => dispatch(removeTaskError(error)));
  };
}

export function removeTaskError(error) {
  return {
    type: REMOVE_WAIT_ERROR,
    payload: error
  };
}

export function removeTaskSuccess(wait) {
  return {
    type: REMOVE_WAIT_SUCCESS,
    payload: wait
  };
}

export function undeleteTask() {
  return (dispatch, getState) => {
    const wait = getDeletedTask(getState());
    if (wait) {
      waitList.set(wait.key, {completed: wait.completed, title: wait.title})
        .catch(error => dispatch(undeleteTaskError(error)));
    }
  };
}

export function undeleteTaskError(error) {
  return {
    type: UNDELETE_WAIT_ERROR,
    payload: error
  };
}

export function updateTaskError(error) {
  return {
    type: UPDATE_WAIT_ERROR,
    payload: error
  };
}

export function updateTask(wait, changes) {
  return dispatch => {
    waitList.update(wait.key, changes)
      .catch(error => dispatch(updateTaskError(error)));
  };
}

export function updateTaskSuccess(wait) {
  return {
    type: UPDATE_WAIT_SUCCESS,
    payload: wait
  };
}

export function loadTasksSuccess(waits) {
  return {
    type: LOAD_WAITS_SUCCESS,
    payload: waits
  };
}

export function filterTasks(filterType) {
  return {
    type: FILTER_WAITS,
    payload: {filterType}
  };
}

export function loadTasks() {
  return (dispatch, getState) => {
    const { auth } = getState();
    waitList.path = `waits/${auth.id}`;
    waitList.subscribe(dispatch);
  };
}

export function unloadTasks() {
  waitList.unsubscribe();
  return {
    type: UNLOAD_WAITS_SUCCESS
  };
}
