'use strict';

class Garage extends yarp.GMObject {
    constructor(config = {}) {
        const {
            id,
            posGarageInfo,
            vehModel,
            vehPlate,
            ownerVehicle
        } = config;
        super();

        if ((id) != null) {
            this._id = id;
            this._posGarageInfo = posGarageInfo;
            this._vehModel = vehModel;
            this._vehPlate = vehPlate;
            this._ownerVehicle = ownerVehicle;
            yarp.mng.register(this);
            this.makeGetterSetter();
        }
    }

    static load(obj) {
        return new Garage(obj._id, obj._posGarageInfo, obj._vehModel, obj._vehPlate, obj._ownerVehicle);
    }
}

module.exports = Garage;