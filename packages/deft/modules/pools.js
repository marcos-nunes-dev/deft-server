const EntityPool = require('../classes/EntityPool');
const database = require('../modules/database');

class PoolCollection {
  constructor() {
    // Initialize all the pools here
    this.vehicles = new EntityPool('Vehicle');
  }
  
  /*
   * Initialize all the pools from database using the load function if available
   */
  async initializeFromDatabase() {
    const pools = Object.keys(this);
    for (let poolName of pools) {
      const poolClass = require('../classes/' + this[poolName].entityClassName);
      if (!poolClass.load) continue;
      
      const entries = await database.find(poolName);
      for (let i = 0, len = entries.length; i < len; i++) {
        const object = poolClass.load(entries[i]);
        if(object) this[poolName].add(object);
      }
    }
  }
};

module.exports = new PoolCollection();
