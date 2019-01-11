'use strict';

/*========================================
 * Key bindings
 *======================================*/

// F5 para enviar comando Yes para notificações
mp.keys.bind(0x74, false, function() {
  mp.events.call('deftBackgroundBrowserExecute', ['notifications/COMMAND_YES']);
});

// F6 para enviar comando No para notificações
mp.keys.bind(0x75, false, function() {
  mp.events.call('deftBackgroundBrowserExecute', ['notifications/COMMAND_NO']);
});

/*========================================
 * CEF Calls
 *======================================*/

mp.events.add('CEFacceptJobRequest', (notificationId) => {
  mp.events.callRemote('acceptJobRequest', notificationId);
});


/*========================================
 * Taxi
 *======================================*/

mp.events.add('CEF_cancelTaxiWithTax', (requestId) => {
  mp.events.callRemote('cancelTaxiWithTax', requestId);
});

mp.events.add('CEF_finishTaxiRide', () => {
  mp.events.callRemote('finishTaxiRide');
});

let taxiTrackingBlip = null;

mp.events.add('updateTaxiTrackingBlip', (x, y, z, requestType) => {
  const coords = new mp.Vector3(x, y, z);
  if (!taxiTrackingBlip) {
    switch (requestType) {
      case "Taxista":
        taxiTrackingBlip = mp.blips.new(56, coords, {
          name: 'Taxi',
          color: 66,
          shortRange: false,
        });
        break;
      case "Policial":
        taxiTrackingBlip = mp.blips.new(60, coords, {
          name: 'Policial',
          color: 46,
          shortRange: false,
        });
        break;
      case "Inteligencia":
        taxiTrackingBlip = mp.blips.new(400, coords, {
          name: 'Agente',
          color: 62,
          shortRange: false,
        });
        break;
      case "Mecanico":
        taxiTrackingBlip = mp.blips.new(446, coords, {
          name: 'Mecânico',
          color: 74,
          shortRange: false,
        });
        break;
      case "Resgate":
        taxiTrackingBlip = mp.blips.new(153, coords, {
          name: 'Paramédico',
          color: 75,
          shortRange: false,
        });
        break;
      case "Transito":
        taxiTrackingBlip = mp.blips.new(477, coords, {
          name: 'Taxi',
          color: 25,
          shortRange: false,
        });
        break;
    }   
    
  }
  taxiTrackingBlip.setCoords(coords);
  taxiTrackingBlip.setRoute(false);
  taxiTrackingBlip.setRoute(true);
});

mp.events.add('clearTaxiTrackingBlip', () => {
  if (taxiTrackingBlip) {
    taxiTrackingBlip.destroy();
    taxiTrackingBlip = undefined;
  }
});

mp.events.add('createPassangerWaypoint', (player, position) => {		
	mp.game.ui.setNewWaypoint(position.x, position.y);
});