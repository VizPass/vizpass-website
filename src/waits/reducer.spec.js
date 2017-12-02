import { List } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/auth/action-types';

import {
  CREATE_WAIT_SUCCESS,
  REMOVE_WAIT_SUCCESS,
  FILTER_WAITS,
  LOAD_WAITS_SUCCESS,
  UPDATE_WAIT_SUCCESS
} from './action-types';

import { Wait } from './wait';
import { waitsReducer, WaitsState } from './reducer';


describe('Waits reducer', () => {
  let wait1;
  let wait2;

  beforeEach(() => {
    wait1 = new Wait({completed: false, key: '0', title: 'wait 1'});
    wait2 = new Wait({completed: false, key: '1', title: 'wait 2'});
  });


  describe('CREATE_WAIT_SUCCESS', () => {
    it('should prepend new wait to list', () => {
      let state = new WaitsState({list: new List([wait1])});

      let nextState = waitsReducer(state, {
        type: CREATE_WAIT_SUCCESS,
        payload: wait2
      });

      expect(nextState.list.get(0)).toBe(wait2);
      expect(nextState.list.get(1)).toBe(wait1);
    });
  });


  describe('REMOVE_WAIT_SUCCESS', () => {
    it('should remove wait from list', () => {
      let state = new WaitsState({list: new List([wait1, wait2])});

      let nextState = waitsReducer(state, {
        type: REMOVE_WAIT_SUCCESS,
        payload: wait2
      });

      expect(nextState.deleted).toBe(wait2);
      expect(nextState.list.size).toBe(1);
      expect(nextState.list.get(0)).toBe(wait1);
      expect(nextState.previous).toBe(state.list);
    });
  });


  describe('FILTER_WAITS', () => {
    it('should set filter with provided value', () => {
      let state = new WaitsState();

      let nextState = waitsReducer(state, {
        type: FILTER_WAITS,
        payload: {
          filterType: 'completed'
        }
      });

      expect(nextState.filter).toBe('completed');
    });
  });


  describe('LOAD_WAITS_SUCCESS', () => {
    it('should set wait list', () => {
      let state = new WaitsState();

      let nextState = waitsReducer(state, {
        type: LOAD_WAITS_SUCCESS,
        payload: [wait1, wait2]
      });

      expect(nextState.list.size).toBe(2);
    });

    it('should order waits newest first', () => {
      let state = new WaitsState();

      let nextState = waitsReducer(state, {
        type: LOAD_WAITS_SUCCESS,
        payload: [wait1, wait2]
      });

      expect(nextState.list.get(0)).toBe(wait2);
      expect(nextState.list.get(1)).toBe(wait1);
    });
  });


  describe('UPDATE_WAIT_SUCCESS', () => {
    it('should update wait', () => {
      let state = new WaitsState({list: new List([wait1, wait2])});
      let changedWait = wait2.set('title', 'changed');

      let nextState = waitsReducer(state, {
        type: UPDATE_WAIT_SUCCESS,
        payload: changedWait
      });

      expect(nextState.list.get(0)).toBe(wait1);
      expect(nextState.list.get(1)).toBe(changedWait);
    });
  });


  describe('SIGN_OUT_SUCCESS', () => {
    it('should reset state', () => {
      let state = new WaitsState({
        delete: wait1,
        list: new List([wait1, wait2]),
        previous: new List()
      });

      let nextState = waitsReducer(state, {
        type: SIGN_OUT_SUCCESS
      });

      expect(nextState.deleted).toBe(null);
      expect(nextState.list.size).toBe(0);
      expect(nextState.previous).toBe(null);
    });
  });
});
