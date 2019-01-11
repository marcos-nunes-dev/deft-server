import { createStore, applyMiddleware } from 'redux';
import reducer from '../ducks';
// import { middleware as notificationsMiddleware } from '../ducks/notifications';

export default () => {
  return createStore(
    reducer,
    // applyMiddleware(
    //   notificationsMiddleware
    // )
  );
};