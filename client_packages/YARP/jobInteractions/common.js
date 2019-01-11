'use strict';

mp.events.add('alreadyJob', (player) => {
	mp.events.call('destroyBrowser', 'jobs');
    mp.events.callRemote('alreadyJob');
});

mp.events.add('blipGenerator', (player, position) => {		
	mp.game.ui.setNewWaypoint(position.x, position.y);
});

