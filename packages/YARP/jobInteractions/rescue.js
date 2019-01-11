'use strict';

//COMANDOS
mp.events.addCommand("heal", (player) => {
    const char = yarp.characters[player.name];
    if (yarp.utils.jobClassEqual(char.jobs[0], "Resgate")) {       
        const range = 5;
        let getPlayersNearByMe = (player) => {
            const returnPlayers = [];
            mp.players.forEachInRange(player.position, range,
                (player) => {
                    returnPlayers.push(player);
                }
            );
            return returnPlayers.filter(p => p.socialClub !== player.socialClub);
        };
        const playersNearByMe = getPlayersNearByMe(player);
        const target = yarp.characters[playersNearByMe[0]];
        const char = yarp.characters[player.name];
        if (!target) return;
        target.notifyWithText("Você está sendo curado por:" + char.id, false, 6);
        target.health = 100;
    }
});

// EVENTOS
mp.events.add('beRescue', (player) => {
    const character = yarp.characters[player.name];
    let jobs = character.jobs;

    if (jobs.length > 0) {
        // already has a job
        player.call("alreadyJob");
    } else {
        player.call('destroyBrowser', 'jobs');
        character.giveJob('Resgate-0');
        jobs = yarp.jobs['Resgate-0'];
        character.notifyWithPicture("Bem-vindo(a)!", "Resgate", "Agora você é "+jobs.label+", salve o máximo de vidas! Boa sorte.", "CHAR_CALL911");
        character.save();
    }
});

mp.events.add('rescueGetUniform', (player) => {
    const char = yarp.characters[player.name];
    char.clearClothes();
    char.setClothes(7, 126, 0, 0); // acessories
    char.setClothes(11, 231, 0, 0); // tops
    char.setClothes(4, 93, 0, 0); // legs
    char.setClothes(8, 129, 0, 0); // undershirt
    char.setClothes(3, 0, 0, 0); //torso
    char.setClothes(6, 70, 0, 0); // feets
    char.saveClothes();
    char.notifyWithPicture("Está Uniformizado", "Corp. Resgate", "Agora você está em exercício. Mostre respeito e dedicação.", "CHAR_CALL911");
});

mp.events.add('rescueGetVehicle', (player) => {
    const char = yarp.characters[player.name];
    if (player.vehicle) {
        let takeamb = player.vehicle;
        takeamb.destroy();
        char.notifyWithPicture("Ambulancia Guardada.", "Corp. Resgate", "Obrigado por devolver ela em bom estado.", "CHAR_CALL911");
    } else {
        let amb = mp.vehicles.new(mp.joaat("ambulance"), player.position);
        player.putIntoVehicle(amb, -1);
        char.notifyWithPicture("Socorrista em ação", "Corp. Resgate", "Fique atento aos chamados e ligue a sirene quando estiver em chamado!", "CHAR_CALL911");
    }
});

mp.events.add('rescueGetChopper', (player) => {
    const char = yarp.characters[player.name];
    if (player.vehicle) {
        let takeamb = player.vehicle;
        takeamb.destroy();
        char.notifyWithPicture("Águia Guardado.", "Corp. Resgate", "Obrigado por devolver ela em bom estado.", "CHAR_CALL911");
    } else {
        let amb = mp.vehicles.new(mp.joaat("cargobob2"), player.position,
            {
                color: [[255, 0, 0], [255, 255, 255]]
            }
            );
        player.putIntoVehicle(amb, -1);
        char.notifyWithPicture("Águia em Ação!", "Corp. Resgate", "Cuidado ao efetuar pousos! Você precisa salvar uma vida e não destruir a cidade.", "CHAR_CALL911");
    }
});