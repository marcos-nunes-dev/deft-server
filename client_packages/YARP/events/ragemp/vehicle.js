'use strict';
/**
* @file Vehicle events
* @namespace client.vehicle
*/

const localPlayer = mp.players.local;
var signal1, signal2, signalx, signalsiren, signallight;

/**
 * Entering vehicle.
 * @event playerStartEnterVehicle
 * @memberof client.vehicle
 * @param {object} vehicle - The vehicle of the event.
 * @param {number} seat - The seat he is sitting on.
 */
mp.events.add('playerStartEnterVehicle', (vehicle, seat) => {
});

/**
 * Entered vehicle.
 * @event playerEnterVehicle
 * @memberof client.vehicle
 * @param {object} vehicle - The vehicle of the event.
 * @param {number} seat - The seat he is sitting on.
 */
mp.events.add('playerEnterVehicle', (vehicle, seat) => {
});

mp.keys.bind(0x64, true, function() { //Seta Esquerda (PADNUM 4)

    if (signal1 && localPlayer.vehicle) {
        signal1 = false;
        localPlayer.vehicle.setIndicatorLights(1, false);
    } else

    if (signal2 && localPlayer.vehicle) {
        localPlayer.vehicle.setIndicatorLights(0, false);
        localPlayer.vehicle.setIndicatorLights(1, true);
        signal1 = true;
        signal2 = false;
    } else if (localPlayer.vehicle) {
        localPlayer.vehicle.setIndicatorLights(1, true);
        signal1 = true;
        signal2 = false;
    }
});

mp.keys.bind(0x66, true, function() { // Seta Direita (PADNUM 6)

    if (signal2 && localPlayer.vehicle) {
        signal2 = false;
        localPlayer.vehicle.setIndicatorLights(0, false);
    } else
    if (signal1 && localPlayer.vehicle) {
        localPlayer.vehicle.setIndicatorLights(1, false);
        localPlayer.vehicle.setIndicatorLights(0, true);
        signal1 = false;
        signal2 = true;
    } else if (localPlayer.vehicle) {
        localPlayer.vehicle.setIndicatorLights(0, true);
        signal2 = true;
    }
});

mp.keys.bind(0x65, true, function() { // Alerta (PADNUM 5)

    if (signalx && localPlayer.vehicle) {
        localPlayer.vehicle.setIndicatorLights(1, false);
        localPlayer.vehicle.setIndicatorLights(0, false);
        signalx = false;

    } else
    if (localPlayer.vehicle) {
        localPlayer.vehicle.setIndicatorLights(1, true);
        localPlayer.vehicle.setIndicatorLights(0, true);
        signalx = true;
    }
})

mp.keys.bind(0x12, true, function() { // Sirene (ALT)

    if (signalsiren && localPlayer.vehicle) {
        localPlayer.vehicle.setSiren(false);
        signalsiren = false;

    } else
    if (localPlayer.vehicle) {
         localPlayer.vehicle.setSiren(true);
        signalsiren = true;
    }
})

mp.keys.bind(0x60, true, function() { // Acender Luz (NUMPAD 0)

    if (signallight && localPlayer.vehicle) {
        localPlayer.vehicle.setLights(0);
        signallight = false;

    } else
    if (localPlayer.vehicle) {
         localPlayer.vehicle.setLights(2);
        signallight = true;
    }
})

mp.events.add('render', () => {
    const controls = mp.game.controls;

    controls.enableControlAction(0, 23, true);
    controls.disableControlAction(0, 58, true);

    if (controls.isDisabledControlJustPressed(0, 58)) {
        let position = mp.players.local.position;
        let vehHandle = mp.game.vehicle.getClosestVehicle(position.x, position.y, position.z, 5, 0, 70);

        let vehicle = mp.vehicles.atHandle(vehHandle);

        if (vehicle
            && vehicle.isAnySeatEmpty()
            && vehicle.getSpeed() < 5) {
            mp.players.local.taskEnterVehicle(vehicle.handle, 5000, 0, 2, 1, 0);
        }
    }
});
