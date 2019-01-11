'use strict';

//COMANDOS
mp.events.addCommand("repair", (player) => {
    const char = yarp.characters[player.name];
    if (yarp.utils.jobClassEqual(char.jobs[0], "Mecanico")) {
        let getVehiclesNearbyMe = (player) => {
            const returnVehicles = [];
            mp.vehicles.forEachInRange(player.position, 100,
                (vehicle) => {
                    returnVehicles.push(vehicle);
                }
            );
            return returnVehicles;
        };
        const vehiclesNearbyMe = getVehiclesNearbyMe(mp.players.at(0));
        const engineHealth = vehiclesNearbyMe[0].engineHealth;
        const bodyHealth = vehiclesNearbyMe[0].bodyHealth;
        vehiclesNearbyMe[0].repair();
    }
});

//EVENTOS
mp.events.add("trailerAttached", (vehicle, trailer) => {
    if (vehicle.model == 2971866336) {        
        const occ = vehicle.getOccupants();
        const player = occ[0];
        const char = yarp.characters[player.name]
        const recoveryCenter = { x: 488.5623474121094, y: -1399.9097900390625, z: 29.28117561340332};               
        player.call('blipGenerator', [player, recoveryCenter]);
        char.notifyWithPicture("Leve Até o Local", "Mêcanico", "Para um reparo completo leve o veículo até o local indicado no mapa.", "CHAR_LS_CUSTOMS");
    }
});

mp.events.add('beMecanic', (player) => {
    const character = yarp.characters[player.name];
    let jobs = character.jobs;
    if (jobs.length > 0) {
        // already has a job
        player.call("alreadyJob");
    } else {
        player.call('destroyBrowser', 'jobs');
        character.giveJob('Mecanico-0');
        jobs = yarp.jobs['Mecanico-0'];
        character.notifyWithPicture("Bem-vindo(a)!", "Mêcanico", "Agora você é um "+jobs.label+", mão na graxa e muito suor! Boa sorte.", "CHAR_LS_CUSTOMS");
        character.save();
    }
});

mp.events.add('getTruck', (player) => {
    let truck = mp.vehicles.new(mp.joaat("towtruck"), player.position);
    player.putIntoVehicle(truck, -1);
});

mp.events.add('repairVehicle', (player) => {
    console.log("reparar");
});

mp.events.add('setUniformMasc', (player) => {
    const char = yarp.characters[player.name];
    char.setClothes(0, 66, 0, 0);
    char.setClothes(3, 41, 0, 0);
    char.setClothes(4, 90, 0, 0);
    char.setClothes(6, 27, 0, 0);
    char.saveClothes();
});

mp.events.add('setUniformFem', (player) => {

});

