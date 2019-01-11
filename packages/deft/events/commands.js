const Vehicle = require('../classes/Vehicle');
const pools = require('../modules/pools');

let _veh = null;

mp.events.addCommand("veh", (player, model) => {
  console.log('creae veh', model);
  
  _veh = new Vehicle({
    model: model,
    position: player.position,
    heading: player.heading,
    plate: "Testando123",
    fuel: 100,
  });
  
  player.putIntoVehicle(_veh.mp, -1);
});

mp.events.addCommand('pool', (player) => {
  console.log('pool size', pools.vehicles.size);
})

mp.events.addCommand('hh', (player) => {
  //console.log('pos', _veh.position);
  _veh.heading = player.heading;
})