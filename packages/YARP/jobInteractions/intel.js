'use strict';

//COMANDOS
mp.events.addCommand("hideid", (player) => {
    const char = yarp.characters[player.name];
    if(char.clothes[1].drawable == 121){
    	char.setClothes(1, 0, 0, 0); //mask
    	char.setClothes(7, 0, 0, 0); // acessories
    	char.setClothes(8, 57, 0, 0); // undershirt
    	char.saveClothes();
    	char.notifyWithPicture("Modo Invisível", "Inteligência", "Você está disfarçado, passe desbercebido em qualquer lugar.", "CHAR_BLANK_ENTRY");
    }else {
    	char.setClothes(1, 121, 0, 0); //mask
    	char.setClothes(7, 125, 0, 0); // acessories
    	char.setClothes(8, 130, 0, 0); // undershirt
    	char.saveClothes();
    	char.notifyWithPicture("Modo Intel", "Inteligência", "Você está identificado. Utilize seu poder e leve bandidos a prisão.", "CHAR_BLANK_ENTRY");
    }
});

mp.events.addCommand("identidade", (player) => {
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
    target.notifyWithText("Sua identidade está sendo analisada por:" + char.id, false, 6);
    char.notifyWithText("Nome:"+target.id+" CNH:"+target.cnh, false, 6);
});

mp.events.addCommand("prender", (player) => {
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
    const target = playersNearByMe[0];
    if (!target) return;
    console.log(target.socialClub);
    mp.players.forEachInRange(player.position, 10, (player_) => {
        player_.call("prenderAttach", [player, target]);
    });
});

mp.events.addCommand("revistar", (player) => {
    const char = yarp.characters[player.name];
    const range = 5;
    let getPlayersNearByMe = (playerTarget) => {
        const returnPlayers = [];
        mp.players.forEachInRange(playerTarget.position, range,
            (p) => {
                returnPlayers.push(p);
            }
        );
        return returnPlayers.filter(p => p.socialClub !== playerTarget.socialClub);
    };
    const playersNearByMe = getPlayersNearByMe(player);
    if (playersNearByMe[0]) {
        const target = yarp.characters[playersNearByMe[0].name];
        let crime = false;
        const weaponsLook = target.hasAnyWeapon();
        target.notifyWithText("Você está sendo revistado por:" + char.id, false, 6);
        if (target.dirtyMoney != 0) {
            char.notifyWithText(target.id + " tem " + target.dirtyMoney + " de dinheiro sujo.", false, 6);
            crime = true;
        }
        if (weaponsLook.length > 0) {
            char.notifyWithText(target.id + " tem armas de fogo.", false, 6);
            crime = true;
        }
        if (!crime) {
            char.notifyWithText(target.id + " está Limpo.", false, 6);
        }
    }
});

mp.events.add('beIntel', (player) => {
    const character = yarp.characters[player.name];
    let jobs = character.jobs;

    if (jobs.length > 0) {
        // already has a job
        player.call("alreadyJob");
    } else {
        player.call('destroyBrowser', 'jobs');
        character.giveJob('Inteligencia-0');
        jobs = yarp.jobs['Inteligencia-0'];
        character.notifyWithPicture("Bem-vindo(a)!", "Inteligência", "Agora você é "+jobs.label+", por trás de tudo sempre existe uma mente pensante.", "CHAR_BLANK_ENTRY");
        character.save();
    }
});

mp.events.add('intelGetUniform', (player) => {
    const char = yarp.characters[player.name];
    char.clearClothes();
    char.setClothes(1, 121, 0, 0); //mask
    char.setClothes(3, 11, 0, 0); //torso
    char.setClothes(4, 7, 0, 0); // legs
    char.setClothes(6, 10, 0, 0); // feets
    char.setClothes(7, 125, 0, 0); // acessories
    char.setClothes(8, 130, 0, 0); // undershirt
    char.setClothes(11, 26, 0, 1); // tops
    char.saveClothes();
    char.notifyWithPicture("Está Uniformizado", "Delegado Geral", "Agora você está em exercício. Use seu conhecimento para se camuflar.", "CHAR_BLANK_ENTRY");
});

mp.events.add('intelSaveVehicle', (player) => {
    const char = yarp.characters[player.name];
    if (player.vehicle) {
        let takeveh = player.vehicle;
        takeveh.destroy();
        char.notifyWithPicture("Veículo Guardado.", "Agente X", "Fique tranquilo, não existe local mais seguro que a Intel.", "CHAR_BLANK_ENTRY");
    }else{        
        char.notifyWithPicture("Está Louco?", "Agente X", "Cade o veículo? Já desenvolveram veículos de bolso?", "CHAR_BLANK_ENTRY");
    }
});

mp.events.add('intelGetVehicle', (player) => {
    const char = yarp.characters[player.name];    
    let intelVeh = mp.vehicles.new(mp.joaat("fbi"), player.position,{
        heading: 90
    });
    intelVeh.setMod(23, 2);
    player.putIntoVehicle(intelVeh, -1);
    char.notifyWithPicture("Veículo Camuflado.", "Agente X", "Apesar não aparentar você pode usar as sirenes usando ALT.", "CHAR_BLANK_ENTRY");
});