'use strict';

mp.events.add('OpenPhone', (player) => {
	const char = yarp.characters[player.name];	
	player.call('OpenPhone', [player, char]);
});