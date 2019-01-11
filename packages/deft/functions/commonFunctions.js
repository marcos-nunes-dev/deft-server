'use strict';

const Vehicle = require('../classes/Vehicle');
const pools = require('../modules/pools');


//GASTAR GASOLINA
mp.events.add('fuelConsume', (player, consumelv) => {
    const veh = Vehicle.instanceByNumberPlate(player.vehicle.numberPlate);
    const char = yarp.characters[player.name];
    if (veh.fuel === 0) {
        player.vehicle.engine = false;
        veh.engine = false;
        char.notifyWithPicture("Gasolina Acabou", "Veículo", "Sua gasolina acabou. Ligue para um mecânico para rebocar seu carro até o posto.", 'CHAR_BLOCKED');
    } else {
        veh.fuel -= 1 * consumelv;
        veh.save();
        if (veh.fuel <= 7) {
            char.notifyWithPicture("Gasolina Acabando", "Veículo", "A Luz da reserva do seu veículo ascendeu.", 'CHAR_BLOCKED');
        }
    }
    player.call('displayFuel', [veh.fuel]);
});

//ENCHER GASOLINA
mp.events.add('fillFuel', (player) => {
    const veh = Vehicle.instanceByNumberPlate(player.vehicle.numberPlate);
    const char = yarp.characters[player.name];
    const price = (100 - veh.fuel) * yarp.variables['Fuel Price'].value;
    if (veh.fuel === 100) {
        char.notifyWithPicture("Tanque Cheio", "Posto de Gasolina", "O Tanque já está cheio chefia! Quer mais para que? Vai tomar gasolina?", 'CHAR_JIMMY_BOSTON');
    } else {
        if (char.takeMoney(price)) {
            player.call('fadeScreen');
            veh.fuel = 100;
            veh.save();
            player.call('displayFuel', [veh.fuel]);
            char.notifyWithPicture("Prontinho Chefia!", "Posto de Gasolina", "Está de tanque cheio! Dá para ir em Paleto Bay e voltar 20x.", 'CHAR_JIMMY_BOSTON');
        } else {
            player.call('fadeScreen');
            char.notifyWithPicture("Tá me Zuando?", "Posto de Gasolina", "Com esse seu dinheiro não dá para encher nem um copo de água!", 'CHAR_JIMMY_BOSTON');
        }
    }
});

//LAVAR CARRO
mp.events.add('washVehicle', (player) => {
    const char = yarp.characters[player.name];
    const vehicle = player.vehicle;
    if (char.takeMoney(yarp.variables['washCar'].value)) {
        player.call('fadeScreen');
        player.call('dirtyLevel', [player, vehicle, 0]);
        char.notifyWithPicture("Prontinho Chefia!", "Lava Jato", "Já lavamos o seu veículo, está limpo como se tivesse saido da loja.", yarp.utils.randomCharImg("M"));
    } else {
        player.call('fadeScreen');
        player.call('dirtyLevel', [player, vehicle, 15]);
        char.notifyWithPicture("Tá me Zuando?", "Lava Jato", "Você não tem dinheiro!? Então agora eu terminei de sujar seu otário!", yarp.utils.randomCharImg("M"));
    }
});