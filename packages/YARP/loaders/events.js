'use strict';
/**
 * Loads the events on server-side asynchronously.
 */

module.exports = async () => {
  // Loading events
  try {
    // Load RAGE.MP events
    console.log(chalk.hex('#3E3E3E').bold('[LEGACY] ')+'Carregando Events');
    require('../events/ragemp/checkpoint.js');
    require('../events/ragemp/colshape.js');
    require('../events/ragemp/entity.js');
    require('../events/ragemp/player.js');
    require('../events/ragemp/stream.js');
    require('../events/ragemp/vehicle.js');
    require('../events/ragemp/waypoint.js');
    require('../events/ragemp/world.js');
    require('../events/ragemp/keys.js');
    require('../events/ragemp/notifications.js');

    // Load YARP events
    require('../events/yarp/character.js');
    require('../events/yarp/gamemode.js');
    require('../events/yarp/item.js');
    require('../events/yarp/menu.js');
    
    // Load Deft events
    require('../events/deft/jobRequest.js');
  } catch(err) {
    console.log(chalk.redBright('[LEGACY] ')+'EventError: '+err.message+'\n'+err.stack);
  }
};
