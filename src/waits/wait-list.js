import { FirebaseList } from 'src/firebase';
import * as waitActions from './actions';
import { Wait } from './wait';


export const waitList = new FirebaseList({
  onAdd: waitActions.createWaitSuccess,
  onChange: waitActions.updateWaitSuccess,
  onLoad: waitActions.loadWaitsSuccess,
  onRemove: waitActions.removeWaitSuccess
}, Wait);
