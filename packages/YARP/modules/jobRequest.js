"use strict";

/**
 * Holds utility functions for job notifications.
 * @namespace server.yarp.jobRequest
 */

const uuidv1 = require("uuid/v1");
const TaxiRequest = require('./jobRequest/TaxiRequest');
const jobRequest = {};

/*
 * Chamadas ativas
 */
const requests = [];

/*
 * Player in active job
 */
const working = {};

/*
 * Players time tracking ({ char: startTime })
 */
const playersTimeTracking = {};

/*
 * Get request by ID
 */
jobRequest.requestById = (id) => requests.find(r => r.id === id);

/*
 * Get request by taken
 */
jobRequest.requestByTaken = (taken) => requests.find(r => r.takenBy === taken);

/*
 * Get request by character
 */
jobRequest.requestByChar = (char) => 
  requests.find(r => r.requestedBy === char || r.takenBy === char);

/*
 * Match request
 */
jobRequest.matchRequest = (job, requestedById, takenById) => {
  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    if (
      request.job === job &&
      request.requestedBy &&
      request.requestedBy.id === requestedById &&
      request.takenBy &&
      request.takenBy.id === takenById
    ) {
      return request;
    }
  }
  return null;
};

/*
 * Request for a job
 */
jobRequest.request = (player, jobRequested) => {
  const onlineList = yarp.utils.charactersOnline("return");
  const requestedCharacter = yarp.characters[player.name];
  let success = false;

  const RequestClass = getRequestClassByJob(jobRequested);
  if (!RequestClass) {
    throw new Error('Invalid requested job class: ' + jobRequested);
  }

  // Compose the request
  const request = new RequestClass(jobRequested, requestedCharacter);

  // Send a request notification to all the characters with the requested job
  // that aren't already working
  for (let i = 0; i < onlineList.length; i++) {
    const character = onlineList[i];
    if (working[character.id] === undefined && yarp.utils.hasJobClass(character.jobs, jobRequested)) {     
      request.sendRequestNotification(character);
      success = true;
    }
  }

  // If someone got the request
  if (success) {
    // Add it to the list
    requests.push(request);

    // Update the phase of the request
    request.setPhase('waiting_for_be_taken');

    // And notify the user that requested it
    request.sendWaitingNotification();
  }

  return success;
};

/*
 * Delete request for a job
 */
jobRequest.deleteRequest = (requestId) => {
  const request = requests.find(r => r.id === requestId);
  if (!request) throw new Error('Invalid requestId on deleteRequest');

  if (request.takenBy) {
    delete working[request.takenBy.id];
  }

  request.destroy();

  // Remove from requests array
  const index = requests.indexOf(request);
  if (index > -1) requests.splice(index, 1);
};

/*
 * Accept a request
 */
jobRequest.acceptRequest = (player, requestId) => {
  const character = yarp.characters[player.name];
  const jobDirty = character.jobs[0]; // Use only the first job
  const characterJob = yarp.utils.characterJobClass(jobDirty); // Extract only the job name
  let success = false;

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    if (
      working[character.id] === undefined &&
      request.id === requestId &&
      request.job === characterJob
    ) {
      // Player can accept the request
      working[character.id] = character;

      // Accept the request, this will set takenBy and may change the request phase
      request.onRequestAccepted(player);

      success = true;

      break;
    }
  }

  return success;
};

function getRequestClassByJob(job) {
  switch (job) {
    case 'Taxista': return TaxiRequest;
    default: return null;
  }
}

module.exports = jobRequest;
