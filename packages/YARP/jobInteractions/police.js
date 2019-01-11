'use strict';

//funções na delegacia
//  dar entrada na ficha criminal
//  registro acessos policiais

//COMANDOS
//-prender
//-revistar
//-identidade

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


//FUNÇÕES
mp.events.add('beCop', (player) => {
    const character = yarp.characters[player.name];
    let jobs = character.jobs;
    if (jobs.length > 0) {
        player.call("alreadyJob");
    } else {
        player.call('destroyBrowser', 'jobs');
        character.giveJob('Policial-0');
        jobs = yarp.jobs['Policial-0'];
        character.notifyWithPicture("Bem-vindo(a)!", "Policial", "Agora você é "+jobs.label+", Coragem e honestidade são seus sobrenomes.", "CHAR_CALL911");
        character.save();
    }
});

mp.events.add('copGetLightWeapons', (player) => {
    const char = yarp.characters[player.name];
    if (char.hasWeapon('WEAPON_HEAVYPISTOL')) {
        if (char.getWeaponAmmo('WEAPON_HEAVYPISTOL') >= yarp.variables['maxPistolAmmo'].value) {
            char.notifyWithPicture("Já está bem equipado", "Delegado Geral", "Você já tem o limite de munição para essa arma, mais que isso você pode ficar lento.", "CHAR_MP_ARMY_CONTACT");
        } else {
            const balanceAmmo = yarp.variables['maxPistolAmmo'].value - char.getWeaponAmmo('WEAPON_HEAVYPISTOL');
            char.giveWeaponAmmo('WEAPON_HEAVYPISTOL', balanceAmmo);
            char.notifyWithPicture("Aqui está " + balanceAmmo + " Balas", "Delegado Geral", "Aqui está sua recarga de munição! Use com sabedoria.", "CHAR_MP_ARMY_CONTACT");
            char.save();
        }
    } else {
        char.giveWeapon('WEAPON_HEAVYPISTOL', yarp.variables['maxPistolAmmo'].value);
        char.notifyWithPicture("Olá Oficial", "Delegado Geral", "Aqui está seu equipamento! Use com sabedoria.", "CHAR_MP_ARMY_CONTACT");
        char.save();
    }
    player.armour = 100;
});

mp.events.add('copGetUniform', (player) => {
    const char = yarp.characters[player.name];
    char.setClothes(3, 0, 0, 0); //torso
    char.setClothes(4, 35, 0, 0); // legs
    char.setClothes(6, 27, 0, 0); // feets
    char.setClothes(8, 122, 0, 0); // undershirt
    char.setClothes(9, 0, 0, 0); // body armour
    char.setClothes(11, 55, 0, 0); // tops
    char.saveClothes();
    char.notifyWithPicture("Está Fardado", "Delegado Geral", "Agora você está em exercício. Mostre respeito e dedicação.", "CHAR_MP_ARMY_CONTACT");
});

mp.events.add('copGetChopper', (player) => {
    const char = yarp.characters[player.name];
    if (player.vehicle) {
        let takemav = player.vehicle;
        takemav.destroy();
        char.notifyWithPicture("Mav Guardado", "Delegado Geral", "Obrigado por devolver ele em bom estado.", "CHAR_MP_ARMY_CONTACT");
    } else {
        let mav = mp.vehicles.new(mp.joaat("polmav"), player.position);
        player.putIntoVehicle(mav, -1);
        char.notifyWithPicture("Apoio Aereo", "Delegado Geral", "Voue sempre em uma altura segura oficial! Bom vouo.", "CHAR_MP_ARMY_CONTACT");
    }
});

mp.events.add('copSaveVehicle', (player) => {
    const char = yarp.characters[player.name];    
    const localGarage = yarp.Label.getLabelByID('Policia-GuardarVehi');
    if (player.vehicle) {
        //mp.vehicle
        let takeveh = player.vehicle;

        //get pools.vehicle.deft and chenge garage
        let deftVeh = deft.Vehicle.instanceByNumberPlate(takeveh.numberPlate);
        deftVeh.garage = true;
        deftVeh.save();

        //save the garage Info
        let garage = new yarp.Garage({
            id: takeveh.model+"|"+takeveh.numberPlate+"|"+player.name,
            posGarageInfo: localGarage,
            vehModel: takeveh.model,
            vehPlate: takeveh.numberPlate,
            ownerVehicle: char.id
        });
        garage.save();      

        // Remove the vehicle from pools
        deftVeh.destroy();
           
        //destroy veh from mp.vehicles
        char.notifyWithPicture("Veiculo Guardado", "Delegado Geral", "Aqui seu veículo estará em segurança. Bom trabalho oficial.", "CHAR_MP_ARMY_CONTACT");
    } else {
        char.notifyWithPicture("Está Louco?", "Delegado Geral", "Cade o veículo Oficial? Está fumando as drogas que apreendemos?", "CHAR_MP_ARMY_CONTACT");
    }
});

mp.events.add('copGetVehicle', (player, vehicleName) => {
    const char = yarp.characters[player.name];
    switch (vehicleName) {
        case "Car":
            let car = mp.vehicles.new(mp.joaat("police2"), player.position, {
                heading: 180
            });
            player.putIntoVehicle(car, -1);
            char.notifyWithPicture("Aqui Está", "Delegado Geral", "Muito cuidado com o nosso patrimônio Oficial. Quero a viatura inteira!", "CHAR_MP_ARMY_CONTACT");
            break;
        case "Moto":
            let moto = mp.vehicles.new(mp.joaat("policeb"), player.position, {
                heading: 180
            });
            player.putIntoVehicle(moto, -1);
            char.notifyWithPicture("Aqui Está", "Delegado Geral", "Muito cuidado com o nosso patrimônio Oficial. Quero a viatura inteira!", "CHAR_MP_ARMY_CONTACT");
            break;
        case "Van":
            let van = mp.vehicles.new(mp.joaat("policet"), player.position, {
                heading: 180
            });
            player.putIntoVehicle(van, -1);
            char.notifyWithPicture("Aqui Está", "Delegado Geral", "Muito cuidado com o nosso patrimônio Oficial. Quero a viatura inteira!", "CHAR_MP_ARMY_CONTACT");
            break;
        case "Ranger":
            let rangerx = mp.vehicles.new(mp.joaat("shreriff2"), player.position, {
                heading: 180
            });
            player.putIntoVehicle(rangerx, -1);
            char.notifyWithPicture("Aqui Está", "Delegado Geral", "Muito cuidado com o nosso patrimônio Oficial. Quero a viatura inteira!", "CHAR_MP_ARMY_CONTACT");
            break;
        default:
            char.notifyWithPicture("Tá com oque na boca?", "Delegado Geral", "Fala para fora oficial eu não estou entendendo oque você quer!", "CHAR_MP_ARMY_CONTACT");
    }

});