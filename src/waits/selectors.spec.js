import { List } from 'immutable';
import { WaitsState } from './reducer';
import { getVisibleWaits } from './selectors';
import { Wait } from './wait';


describe('Waits selectors', () => {
  let waits;

  beforeEach(() => {
    waits = new WaitsState({
      list: new List([
        new Wait({completed: false, title: 'wait-1'}),
        new Wait({completed: true, title: 'wait-2'})
      ])
    });
  });


  describe('getVisibleWaits()', () => {
    it('should return list of all waits', () => {
      let waitList = getVisibleWaits({waits});
      expect(waitList.size).toBe(2);
    });

    it('should return list of active (incomplete) waits', () => {
      waits = waits.set('filter', 'active');
      let waitList = getVisibleWaits({waits});

      expect(waitList.size).toBe(1);
      expect(waitList.get(0).title).toBe('wait-1');
    });

    it('should return list of completed waits', () => {
      waits = waits.set('filter', 'completed');
      let waitList = getVisibleWaits({waits});

      expect(waitList.size).toBe(1);
      expect(waitList.get(0).title).toBe('wait-2');
    });
  });
});
