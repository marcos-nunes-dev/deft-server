'use strict';

mp.events.add('beIntel', (player) => {
  mp.events.callRemote("beIntel", player);
});

mp.events.add('intelGetUniform', (player) => {
  mp.events.callRemote("intelGetUniform", player);
});

mp.events.add('intelSaveVehicle', (player) => {
  mp.events.callRemote("intelSaveVehicle", player);
});

mp.events.add('intelGetVehicle', (player) => {
  mp.events.callRemote("intelGetVehicle", player);
});


