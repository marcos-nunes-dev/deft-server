'use strict';

mp.events.add('checkIfIsMoving', (player) => {
	if(mp.players.local.isInAnyVehicle(false)) {
		let velocity = mp.players.local.vehicle.getVelocity();
		let speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);		
		if(speed >= 150){
			mp.events.callRemote('fuelConsume', 3);
		}
		if(speed >= 100 && speed < 150){
			mp.events.callRemote('fuelConsume', 2);
		}
		if(speed < 100 && speed > 0){
			mp.events.callRemote('fuelConsume', 1);
		}
	}
});
