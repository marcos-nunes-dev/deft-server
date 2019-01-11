'use strict';

mp.events.add('acceptJobRequest', (player, requestId) => {
    const character = yarp.characters[player.name];
    const res = yarp.jobRequest.acceptRequest(player, requestId);
    character.removeJobRequest(requestId);
    
	if (!res) {
		character.notifyWithPicture("Pedido já em atendinto", "Downtown Cab Co.", `Me desculpe ${player.id}, já enviamos outro motorista para esse pedido.`, "CHAR_TAXI");
	}
});