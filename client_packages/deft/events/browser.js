/*
 * Background browser that powers the notifications system and HUD
 */
let backgroundBrowser;

mp.events.add('createDeftBackgroundBrowser', () => {
  const url = deft.isDev
    ? 'http://localhost:' + deft.devServerPort
    : 'package://deft/apps/background/index.html';
  backgroundBrowser = mp.browsers.new(url);
});

mp.events.add('deftBackgroundBrowserExecute', (event, props) => {
  if (!backgroundBrowser) return;
  mp.gui.chat.push(`execute ${event}`);
  const propsString = JSON.stringify(props);
  backgroundBrowser.execute(`bridgeExecute('${event}', '${propsString}')`);
});

mp.events.add('destroyDeftBackgroundBrowser', () => {
  if (backgroundBrowser) {
    backgroundBrowser.destroy();
    backgroundBrowser = null;
  }
});