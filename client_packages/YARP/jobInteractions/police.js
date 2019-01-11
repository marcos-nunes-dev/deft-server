'use strict';

mp.events.add('beCop', (player) => {
  mp.events.callRemote("beCop", player);
});

mp.events.add('copGetLightWeapons', (player) => {
  mp.events.callRemote("copGetLightWeapons", player);
});

mp.events.add('copGetUniform', (player) => {
  mp.events.callRemote("copGetUniform", player);
});

mp.events.add('copGetChopper', (player) => {
  mp.events.callRemote("copGetChopper", player);
});

mp.events.add('copSaveVehicle', (player) => {
  mp.events.callRemote("copSaveVehicle", player);
});

mp.events.add('copGetCar', (player) => {
  mp.events.callRemote("copGetVehicle", "Car");
});

mp.events.add('copGetMoto', (player) => {
  mp.events.callRemote("copGetVehicle", "Moto");
});

mp.events.add('copGetVan', (player) => {
  mp.events.callRemote("copGetVehicle", "Van");
});

mp.events.add('copGetRanger', (player) => {
  mp.events.callRemote("copGetVehicle", "Ranger");
});

mp.events.add('prenderAttach', (policial, preso) => {
  preso.attachTo(policial.handle, 0, 0, 0, 0, 0, 0, 0, true, false, false, false, 0, false);
});

mp.events.add('prenderAttach', (policial, preso) => {
	preso.attachTo(policial.handle, 0, 0, 0, 0, 0, 0, 0, true, false, false, false, 0, false);
});





