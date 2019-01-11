'use strict';

// Blips ID Manager
var basicBlips = [];
var mediumBlips = [];
var advancedBlips = [];

//Load Blips
function LoadBlip(vectorHouses, classHouse) {
    for (let i = 0; i < vectorHouses.length; i++) {
        const pos = vectorHouses[i]._entranceOnFoot.split(',').map(x => parseInt(x.trim()));
        advancedBlips[i] = mp.blips.new(375, new mp.Vector3(pos[0],pos[1],pos[2]),
        {
            name: vectorHouses[i]._label+" | Classe "+vectorHouses[i]._propertyClass,
            color: 47,
            shortRange: false,
        });
    }
}

//ClassHouse = A, B or C
mp.events.add('createRealstateBlips', (player, classHouse, vectorHouses) => {
    switch (classHouse) {
        case "A":
        	LoadBlip(vectorHouses, classHouse);	
        	break;
        case "B":
        	LoadBlip(vectorHouses, classHouse);
        	break;
        case "C":
        	LoadBlip(vectorHouses, classHouse);
        	break;
    }
});

mp.events.add('clearRealstateBlips', (player, classHouse) => {
    switch (classHouse) {
        case "A":
        	for (let i = 0; i < advancedBlips.length; i++) {
		    	advancedBlips[i].destroy();
		    }
        	break;
        case "B":
        	for (let i = 0; i < mediumBlips.length; i++) {
		    	mediumBlips[i].destroy();
		    }
        	break;
        case "C":
        	for (let i = 0; i < basicBlips.length; i++) {
		    	basicBlips[i].destroy();
		    }
        	break;
        default:
        	for (let i = 0; i < advancedBlips.length; i++) {advancedBlips[i].destroy();}
		    for (let i = 0; i < mediumBlips.length; i++) {mediumBlips[i].destroy();}
		    for (let i = 0; i < basicBlips.length; i++) {basicBlips[i].destroy();}
    }
});

mp.events.add('enterRealstate', (arrayHouse) => {
    mp.gui.chat.push("quer entrar no "+arrayHouse._label);
});

mp.events.add('enterRealstateGarage', (arrayHouse) => {
    mp.gui.chat.push("quer entrar na garem do "+arrayHouse._label);
});