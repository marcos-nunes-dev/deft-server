'use strict';
const uuidv1 = require("uuid/v1");

// Taxists on ride (id)
const onRide = [];

// Finish ride
function finishRide(requestId) {
  const request = yarp.jobRequest.requestById(requestId);
  if (!request) throw new Error('Invalid requestId on finishRide');

  const taxist = request.takenBy;
  if (taxist) {
    const onRideIndex = onRide.indexOf(taxist.id);
    if (onRideIndex > -1) onRide.splice(onRideIndex, 1);
  }

  yarp.jobRequest.deleteRequest(requestId);
}

/*========================================
 * RAGE events
 *======================================*/

mp.events.add('playerQuit', (player) => {
  const character = yarp.characters[player.name];
  if (!character) return;

  // Check if there is a request in progress with this character
  const request = yarp.jobRequest.requestByChar(character);
  if (!request) return;

  // Stop any tracking
  yarp.jobRequest.stopAndReturnElapsedTimeTracking(request.takenBy.id);

  // Finish the ride, this will delete the request
  finishRide(request.id);
});

let vehicle_ = null;

mp.events.add('playerStartEnterVehicle', (player, vehicle, seat) => {
	const char = yarp.characters[player.name];
  const model = vehicle.model;

  vehicle_ = vehicle;

  // Only interested on taxi models
  if (model != '3338918751') return;
  
  console.log('111');
  
  // If a non taxist try to drive a taxi, deny it
  if (!yarp.utils.hasJobClass(char.jobs, "Taxista") && seat === 0) {
    vehicle.locked = true;
    char.notifyWithPicture("Você não é Taxista", "Ponto de Taxi", "Ei amigo, você não é um taxista! Para usar nossa ponto vá até o balcão de empregos.", "CHAR_TAXI");
    return;
  }

  // Allow other exceptions to enter the vehicle
  vehicle.locked = false;

  // If it is a taxist just driving, turn on the taxi lights
  if (yarp.utils.hasJobClass(char.jobs, "Taxista") && seat === 0) {
    vehicle.taxiLights = true;
    return;
  }
  
  // Ok it is a passenger, Search for the taxist
  let taxist = null;
  const occupants = vehicle_.getOccupants();
  for (let i = 0; i < occupants.length; i++) {
    const char = yarp.characters[occupants[i].name];
    if (yarp.utils.hasJobClass(char.jobs, "Taxista")) {
      taxist = char;
      break;
    }
  }

  // No taxist on the taxi but you managed to get on another seat? Well... ok.
  // Also check if the taxist is already on a ride, if so return too
  if (taxist === null || onRide.indexOf(taxist.id) >= 0) {
    return;
  }

  // If the player is not the taxist, check if the taxist is working and the player is his
  // passenger
  const request = yarp.jobRequest.matchRequest('Taxista', char.id, taxist.id);
  if (request) {
    // Update the phase of the request
    request.setPhase('ride_in_progress');
    onRide.push(taxist.id);
  }
});

/*========================================
 * Custom events
 *======================================*/

mp.events.add('beTaxist', (player) => { 
  const character = yarp.characters[player.name];
  let jobs = character.jobs;

  if (jobs.length > 0) {
    // already has a job
    player.call("alreadyJob", player);
  } else {
    player.call('destroyBrowser', 'jobs');
    character.giveJob('Taxista-0');
    const jobInfo = yarp.jobs[jobs[0]];
    character.notifyWithPicture("Bem-vindo(a)!", "Taxista", "Agora você é "+jobInfo.label+", bom humor e musica boa são fundamentais! Boa sorte.", "CHAR_TAXI");
    character.save(); 
  }
});

mp.events.add('cancelTaxiWithTax', (player, requestId) => {
  const request = yarp.jobRequest.requestById(requestId);
  if (!request) throw new Error('Invalid requestId on cancelTaxiWithTax event');

  // Finish the ride erasing the notifications and
  // working status
  finishRide(requestId);

  // Pay a tax
  // todo
});

mp.events.add('finishTaxiRide', (player) => {
  const char = yarp.characters[player.name];
  const request = yarp.jobRequest.requestByTaken(char);
  if (!request) throw new Error('Invalid player finishing ride on finishTaxiRide event');

  // Get the taxist and the passenger
  const taxist = request.takenBy;
  const requestedBy = request.requestedBy;

  // Get the total cost of the ride
  const elapsed = request.getElapsedTimeTracking();

  // Calculate the total cost
  const totalCost = +(elapsed * yarp.variables['taxiCostPerSecond'].value).toFixed(2);

  // Finish the ride erasing the notifications and
  // working status
  finishRide(request.id);

  console.log(`Elapsed: ${elapsed} | Total cost: ${totalCost}`);

  taxist.player.notify(`O total da corrida foi R$ ${totalCost}`);
  requestedBy.player.notify(`O total da corrida foi R$ ${totalCost}`);
})