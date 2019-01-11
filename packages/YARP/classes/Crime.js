'use strict';

class Crime extends yarp.GMObject {
  constructor(config = {}) {
    const {
        id,
        character,
        type,
        description,
        time,
        charge
    } = config;
    super();

    if ((id) != null) {
        this._id = id;
        this._character = character;
        this._type = type;
        this._description = description;
        this._time = time;
        this._charge = charge;
        yarp.mng.register(this);
        this.makeGetterSetter();
    }
  }

    static load(obj) {
        return new Crime(obj._id, obj._character, obj._type, obj._description, obj._time, obj._charge);
    }
}

module.exports = Crime;