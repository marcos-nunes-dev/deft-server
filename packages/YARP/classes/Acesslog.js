'use strict';

class Acesslog extends yarp.GMObject {
  constructor(config = {}) {
    const {
        id,
        character,
        jobClass,
        dateTime,
        totalPlayed        
    } = config;
    super();

    if ((id) != null) {
        this._id = id;
        this._character = character;
        this._jobClass = jobClass;
        this._dateTime = dateTime;
        this._totalPlayed = totalPlayed;
        yarp.mng.register(this);
        this.makeGetterSetter();
    }
  }

  static load(obj) {
      return new Acesslog(obj._id,obj._character,obj._jobClass,obj._dateTime,obj._totalPlayed);
  }
}

module.exports = Acesslog;