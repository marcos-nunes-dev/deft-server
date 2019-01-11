import { render } from 'inferno';
import Modules from './modules/Modules';
import createStore from './store';
import {Provider} from 'inferno-redux';
import setupBridge from './bridge';

const store = createStore();
setupBridge(store);

render(
  <Provider store={store}>
    <Modules />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();