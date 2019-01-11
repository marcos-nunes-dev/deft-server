'use strict';

// teste._label = "Hotel Fazenda";
// teste.save();
const arrayHouses = yarp.realstates.toArray();
const classAHouses = arrayHouses.filter(x => x.propertyClass === 'A'); 
const classBHouses = arrayHouses.filter(x => x.propertyClass === 'B'); 
const classCHouses = arrayHouses.filter(x => x.propertyClass === 'C'); 

mp.events.addCommand("houses", (player) => {
    const char = yarp.characters[player.name];    
    player.call('createRealstateBlips', [player, "A", classAHouses]);
});

mp.events.addCommand("clearhouses", (player) => {
    const char = yarp.characters[player.name];    
    player.call('clearRealstateBlips', [player]);
});
