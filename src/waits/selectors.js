import { createSelector } from 'reselect';


export function getWaits(state) {
  return state.waits;
}

export function getWaitList(state) {
  return getWaits(state).list;
}

export function getWaitFilter(state) {
  return getWaits(state).filter;
}

export function getDeletedWait(state) {
  return getWaits(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleWaits = createSelector(
  getWaitList,
  getWaitFilter,
  (waits, filter) => {
    switch (filter) {
      case 'active':
        return waits.filter(wait => !wait.completed);

      case 'completed':
        return waits.filter(wait => wait.completed);

      default:
        return waits;
    }
  }
);
