'use strict';

mp.events.add('beRescue', (player) => {
  mp.events.callRemote("beRescue", player);
});

mp.events.add('rescueGetUniform', (player) => {
  mp.events.callRemote("rescueGetUniform", player);
});

mp.events.add('rescueGetVehicle', (player) => {
  mp.events.callRemote("rescueGetVehicle", player);
});

mp.events.add('rescueGetChopper', (player) => {
  mp.events.callRemote("rescueGetChopper", player);
});