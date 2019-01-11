import { bridges } from "../ducks";

export default (store) => {
  window.bridgeExecute = (eventName, strProps) => {
    let props = {};
    try {
      props = JSON.parse(strProps);
    } catch(err) { }
    for (let i = 0; i < bridges.length; i++) {
      const bridge = bridges[i];
      const action = bridge(eventName, props);
      action && store.dispatch(action);
    }
  }
}