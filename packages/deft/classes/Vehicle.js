const uuidv1 = require('uuid/v1');
const pools = require('../modules/pools');
const database = require('../modules/database');

class Vehicle {
  constructor(config = {}, opts = {}) {
    const {
      id,
      model,
      position,
      heading,
      rotation,
      owner,
      numberPlate,
      color,
      alpha,
      locked,
      engine,
      garage,
      dirtyLevel,
      fuel,
      dimension,
      visible,
    } = config;

    if (!model || !position) {
      throw new Error('Vehicle config is missing model or position');
    }

    this.id = id || uuidv1();
    this.model = model;
    this.owner = owner !== undefined ? owner : null;
    this.garage = garage || false;
    this.dirtyLevel = dirtyLevel !== undefined ? dirtyLevel : 0;
    this.fuel = fuel !== undefined ? fuel : 100;
    this.visible = visible !== undefined ? visible : true;
    this.playersInside = [];

    this.mp = mp.vehicles.new(mp.joaat(this.model), position,
    {
      heading: heading || 0,
      rotation: rotation || new mp.Vector3(0, 0, 0),
      numberPlate: numberPlate || this.generateRandomPlate(8),
      alpha: alpha || 255,
      color: color || [0, 0, 0],
      locked: locked || false,
      engine: engine || false,
      dimension: dimension || 0,
    });

    if (!opts.skipPool) {
      pools.vehicles.add(this);
    }
  }

  generateRandomPlate(digits) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let text = '';
    for (let i = 0; i < digits; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  }

  destroy() {
    if (this.mp) {
      this.mp.destroy();
    }
    pools.vehicles.remove(this);
  }

  save() {
    const data = {
      _id: this.id,
      model: this.model,
      owner: this.owner,
      garage: this.garage,
      dirtyLevel: this.dirtyLevel,
      fuel: this.fuel,
      visible: this.visible,

      mp_position: this.mp.position,
      mp_heading: this.mp.heading,
      mp_rotation: this.mp.rotation,
      mp_numberPlate: this.mp.numberPlate,
      mp_alpha: this.mp.alpha,
      mp_color: this.mp.color,
      mp_locked: this.mp.locked,
      mp_engine: this.mp.engine,
      mp_dimension: this.mp.dimension,
    };
    database.save('vehicles', data);
  }

  static load(data) {
    if (data.garage) return null;
    
    return new Vehicle({
      id: data._id,
      model: data.model,
      owner: data.owner,
      garage: data.garage,
      dirtyLevel: data.dirtyLevel,
      fuel: data.fuel,
      visible: data.visible,

      position: data.mp_position,
      heading: data.mp_heading,
      rotation: data.mp_rotation,
      numberPlate: data.mp_numberPlate,
      alpha: data.mp_alpha,
      color: data.mp_color,
      locked: data.mp_locked,
      engine: data.mp_engine,
      dimension: data.mp_dimension,
    }, {
      skipPool: true,
    });
  }

  static instanceByNumberPlate(numberPlate) {
    let vehicle = null;
    pools.vehicles.forEach((veh) => {
      if (veh.mp.numberPlate === numberPlate) {
        vehicle = veh;
      }
    })
    return vehicle;
  }

  static mpInstanceByNumberPlate(Plate){
    let vehicle = null;
    mp.vehicles.forEach((veh) => {
      if (veh.numberPlate === Plate) {
        vehicle = veh;
      }
    })
    return vehicle;
  }

  get position() {
    if (!this.mp) throw new Error('Can\'t retrieve position to non initialized multiplayer entity');
    return this.mp.position;
  }

  set position(value) {
    this.mp.position = value;
  }

  get heading() {
    if (!this.mp) throw new Error('Can\'t retrieve heading to non initialized multiplayer entity');
    return this.mp.heading;
  }

  set heading(value) {
    const x = this.mp.rotation.x;
    const y = this.mp.rotation.y;
    this.mp.rotation = new mp.Vector3(x, y, value);
  }
}

module.exports = Vehicle;
