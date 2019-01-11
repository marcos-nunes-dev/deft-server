const uuidv1 = require('uuid/v1');
const BaseRequest = require('./BaseRequest');

class TaxiRequest extends BaseRequest {
  constructor(jobRequested, requestedCharacter) {
    super(jobRequested, requestedCharacter);
  }

  sendRequestNotification(character) {
    character.notifyWithDeft(this.id, 'Pedido de Taxi', 'jobRequest', 'Aceitar', 'Recusar', 30);
  }

  sendWaitingNotification() {
    this.requestedBy.notifyWithDeft(
      uuidv1(),
      'Esperando a resposta de um Taxista...',
      'jobRequestedTracking',
      null,
      null,
      30
    );
  }

  onRequestAccepted(takenByPlayer) {
    super.onRequestAccepted(takenByPlayer);
    const takenBy = yarp.characters[takenByPlayer.name];

    // Update the phase
    this._phase = 'taxi_going';

    // Send notification to who request
    this.requestedBy.notifyWithDeft(
      uuidv1(),
      'O seu chamado está a caminho!',
      'jobRequestedTracking',
      null,
      'Cancelar',
      null,
      { phase: 'taxi_going', requestId: this.id }
    );

    // Clear all the jobRequest notifications and send a tracking notification to who accept the request
    takenBy.clearDeftNotificationsGroup('jobRequest');
    takenBy.notifyWithDeft(
      uuidv1(),
      'Vá até o local demarcado no mapa',
      'jobRequestTracking',
      null,
      'Cancelar',
      null,
      { phase: 'taxi_going', requestId: this.id }
    );

    // Create a waypoint on taxist's UI
    takenByPlayer.call('createPassangerWaypoint', [takenByPlayer, this.requestedBy._position]);

    // Tracks the position of the taxist
    this.startPositionTracking(
      takenBy,
      position => {
        if (!this.requestedBy || !this.requestedBy.player) {
          this.stopPositionTracking();
          return;
        }
        this.requestedBy.player.call('updateTaxiTrackingBlip', [
          position.x,
          position.y,
          position.z,
          this.job
        ]);
      },
      2000
    );
  }

  setPhase(phase) {
    super.setPhase(phase);
    if (phase === 'ride_in_progress') {
      const taxist = this.takenBy;
      const passenger = this.requestedBy;

      // Remove the tracking from the taxist
      this.stopPositionTracking();

      // Start the ride and notify both passengers
      this.startTimeTracking();
      setTimeout(() => {
        passenger.player.call('clearTaxiTrackingBlip');
        passenger.notifyWithDeft(
          uuidv1(),
          'Corrida em andamento...',
          'jobRequestedTracking',
          null,
          null,
          null,
          { phase: 'ride_in_progress' }
        );
      }, 1000);
      taxist.notifyWithDeft(
        uuidv1(),
        'Corrida em andamento...',
        'jobRequestTracking',
        null,
        'Finalizar',
        null,
        { phase: 'ride_in_progress' }
      );
    }
  }

  destroy() {
    super.destroy();
    if (this.requestedBy) {
      this.requestedBy.player.call('clearTaxiTrackingBlip');
    }
  }
}

module.exports = TaxiRequest;
