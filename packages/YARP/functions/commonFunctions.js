'use strict';

const fs = require("fs");
const saveFile = "savedpos.txt";


//CURAR PLAYER
mp.events.add('healPlayer', (player) => {
    const char = yarp.characters[player.name];
    if (char.takeMoney(yarp.variables['hospitalCost'].value)) {
        player.call('fadeScreen');
        player.health = 100;
        char.notifyWithPicture("Atendimento Concluído", "Hospital", "Apenas algumas feridas leves, nada que um remédio e um pouco de carinho não resolva.", yarp.utils.randomCharImg("F"));      
    }else {
        player.call('fadeScreen');
        player.health = 1;
        char.notifyWithPicture("Tá brincando?", "Hospital", "Você não tem dinheiro? Hospital é coisa seria! Toma esse tapa na cara para deixar de ser bobo!", yarp.utils.randomCharImg("F"));     
    }
    
});

mp.events.add('updatePlayerClothes', (player, clothesJson) => { 
    let clothes = JSON.parse(clothesJson);
    if (!clothes) return;
    for (var i = 12 - 1; i >= 0; i--) {     
        if (!clothes[i]) continue;
        player.setClothes(i, clothes[i].drawable, clothes[i].palette, clothes[i].texture);
    }
});

//SALVAR POSIÇÃO ATUAL
mp.events.addCommand("save", (player, name = "No name") => {
    let pos = (player.vehicle) ? player.vehicle.position : player.position;
    let rot = (player.vehicle) ? player.vehicle.rotation : player.heading;

    fs.appendFile(saveFile, `Position: ${pos.x}, ${pos.y}, ${pos.z} | ${(player.vehicle) ? `Rotation: ${rot.x}, ${rot.y}, ${rot.z}` : `Heading: ${rot}`} | ${(player.vehicle) ? "InCar" : "OnFoot"} - ${name}\r\n`, (err) => {
        if (err) {
            player.notify(`~r~SavePos Error: ~w~${err.message}`);
        } else {
            player.notify(`~g~Position saved. ~w~(${name})`);
        }
    });
});

