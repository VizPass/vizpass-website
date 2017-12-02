import { List, Record } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/auth/action-types';
import {
  CREATE_WAIT_SUCCESS,
  REMOVE_WAIT_SUCCESS,
  FILTER_WAITS,
  LOAD_WAITS_SUCCESS,
  UPDATE_WAIT_SUCCESS
} from './action-types';


export const WaitsState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function waitsReducer(state = new WaitsState(), {payload, type}) {
  switch (type) {
    case CREATE_WAIT_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });

    case REMOVE_WAIT_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(wait => wait.key !== payload.key)
      });

    case FILTER_WAITS:
      return state.set('filter', payload.filterType || '');

    case LOAD_WAITS_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_WAIT_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(wait => {
          return wait.key === payload.key ? payload : wait;
        })
      });

    case SIGN_OUT_SUCCESS:
      return new WaitsState();

    default:
      return state;
  }
}
