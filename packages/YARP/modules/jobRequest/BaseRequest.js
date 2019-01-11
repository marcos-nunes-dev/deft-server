const uuidv1 = require('uuid/v1');

class BaseRequest {
  constructor(jobRequested, requestedCharacter) {
    this.id = uuidv1();
    this.job = jobRequested;
    this.requestedBy = requestedCharacter;
    this._takenBy = null;
    this._phase = null;

    // Player tracking
    this._playerTracking = null;
    this._timeTracking = null;
  }

  sendRequestNotification() {
    throw new Error('sendRequestNotification not implemented');
  }

  sendWaitingNotification() {
    throw new Error('sendWaitingNotification not implemented');
  }

  onRequestAccepted(takenByPlayer) {
    const takenBy = yarp.characters[takenByPlayer.name];
    this._takenBy = takenBy;
  }

  startPositionTracking(targetCharacter, callback, interval) {
    if (!targetCharacter) return;
    if (this._playerTracking) {
      this.stopPositionTracking();
    }
    this._playerTracking = setInterval(() => {
      if (!targetCharacter || !targetCharacter.player) {
        this.stopPositionTracking();
        return;
      }

      const coords = targetCharacter.player.position;
      callback(coords);
    }, interval);
  }

  stopPositionTracking() {
    if (this._playerTracking) {
      clearInterval(this._playerTracking);
      this._playerTracking = null;
    }
  }

  startTimeTracking() {
    this._timeTracking = new Date();
  }

  getElapsedTimeTracking() {
    if (!this._timeTracking) return 0;
    var firstTime = this._timeTracking;
    var nowTime = new Date();
    var elapsed = Math.abs(Math.floor((nowTime - firstTime) / 1000));
    return elapsed;
  }

  stopTimeTracking() {
    this._timeTracking = null;
  }

  setPhase(phase) {
    this._phase = phase;
  }

  destroy() {
    // Stop trackings
    this.stopPositionTracking();
    this.stopTimeTracking();
    // Clear any tracking notifications
    this.requestedBy && this.requestedBy.clearDeftNotificationsGroup('jobRequestedTracking');
    this._takenBy && this.takenBy.clearDeftNotificationsGroup('jobRequestTracking');
  }

  get takenBy() {
    return this._takenBy;
  }

  get phase() {
    return this._phase;
  }
}

module.exports = BaseRequest;
