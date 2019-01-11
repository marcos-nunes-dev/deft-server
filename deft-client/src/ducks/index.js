import { combineReducers } from 'redux';
import notifications, { bridge as notificationsBridge } from './notifications';

export const bridges = [notificationsBridge];

export default combineReducers({
  notifications,
});