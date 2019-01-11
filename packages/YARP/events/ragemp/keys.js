'use strict';

let MenuKActive = 0;

// LETRA K PARA ABRIR O MENU
mp.events.add('playerOpenMenu', (player) => {	
	if(MenuKActive === 0){
		player.call('createBrowser', ['menuPrincipal', ['package://YARP/ui/html/bankMenu.html']]);
		MenuKActive = 1;	
	}else{
		player.call('destroyBrowser', ['menuPrincipal']);
		MenuKActive = 0;
	}
});

mp.events.add('rejectResponse', (player) => {
	console.log('req');
	console.log('Rejeitei');
});

