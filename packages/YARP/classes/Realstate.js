'use strict';

class Realstate extends yarp.GMObject{
  constructor(id, label, dailyFee, entranceOnFoot, entranceVehicle, outVehicle, headingVehicleOut, propertyPos, propertyClass, salePrice){
    super();
    if ((label && entranceOnFoot && entranceVehicle && propertyPos && propertyClass) != null){
      this._id = id;
      this._label = label || "Imóvel | Classe "+propertyClass;
      this._dailyFee = dailyFee || 300;
      this._entranceOnFoot = entranceOnFoot;
      this._entranceVehicle = entranceVehicle;
      this._outVehicle = outVehicle || entranceVehicle;
      this._headingVehicleOut = headingVehicleOut || 0;
      this._propertyPos = propertyPos;
      this._propertyClass = propertyClass;
      this._salePrice = salePrice;

      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
  
  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Character
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Realstate(obj._id, obj._label, obj._dailyFee, obj._entranceOnFoot, obj._entranceVehicle, obj._outVehicle, obj._headingVehicleOut, obj._propertyPos, obj._propertyClass, obj._salePrice);
  }

  // static config(file){
  //   let realstates = require(file);
  //   for (let id in realstates){
  //     let realstate = realstates[id];
  //     console.log(realstate);
  //     const checkBD = yarp.realstates.at(realstate.id);
  //     if(!checkBD){
  //       new Realstate(id, realstate.label+" Classe "+realstate.propertyClass, realstate.dailyFee, realstate.entranceOnFoot, realstate.entranceVehicle, realstate.outVehicle, realstate.headingVehicleOut, realstate.propertyPos, realstate.propertyClass);
  //       Realstate.save();
  //     }
  //   }
  // }  
}
module.exports = Realstate;
