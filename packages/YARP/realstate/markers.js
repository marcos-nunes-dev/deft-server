'use strict';

const arrayHouses = yarp.realstates.toArray();
const entranceOnFoots = arrayHouses.map(x => x._entranceOnFoot);
const entranceVehicles = arrayHouses.map(x => x._entranceVehicle);

for (var i = entranceOnFoots.length - 1; i >= 0; i--) {
	const pos = entranceOnFoots[i].split(',').map(x => parseInt(x.trim()));	
	mp.markers.new(1, yarp.utils.Vector3Offset(new mp.Vector3(pos[0],pos[1],pos[2]),new mp.Vector3(0,0,-0.5)), 1,
	{
	    direction: new mp.Vector3(0, 0, 0),
	    rotation: new mp.Vector3(0, 0, 0),
	    color: [0,236,144,255],
	    visible: true,
	    dimension: 0
	});
}

for (var i = entranceVehicles.length - 1; i >= 0; i--) {
	const pos = entranceVehicles[i].split(',').map(x => parseInt(x.trim()));	
	mp.markers.new(1, yarp.utils.Vector3Offset(new mp.Vector3(pos[0],pos[1],pos[2]),new mp.Vector3(0,0,-0.5)), 3,
	{
	    direction: new mp.Vector3(0, 0, 0),
	    rotation: new mp.Vector3(0, 0, 0),
	    color: [0,236,144,255],
	    visible: true,
	    dimension: 0
	});
}