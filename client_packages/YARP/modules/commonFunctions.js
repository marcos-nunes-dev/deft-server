'use strict';



mp.events.add('bodyHealth', (player) => {
	mp.players.local.vehicle.setBodyHealth(1);
	let bodyHealth = mp.players.local.vehicle.getBodyHealth();
	mp.events.callRemote("vehDam", bodyHealth);
});

mp.events.add('washVehicle', (player) => {
	mp.events.callRemote("washVehicle");
});

mp.events.add('fillFuel', (player) => {
	mp.events.callRemote("fillFuel");
});

mp.events.add('dirtyLevel', (player, vehicle, level) => {
	if(mp.players.local.isInAnyVehicle(false)) {
		vehicle.setDirtLevel(level);
	}
});

mp.events.add('healPlayer', (player) => {
	mp.events.callRemote("healPlayer");
});

mp.events.add('fadeScreen', (player) => {	
	mp.game.graphics.startScreenEffect('MinigameTransitionOut', 0, false);	
});


