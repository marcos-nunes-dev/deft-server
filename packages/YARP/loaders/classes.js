'use strict';
/**
 * Loads the classes on server-side asynchronously.
 */

module.exports = async () => {
  // Loading classes
  console.log(console.log(chalk.hex('#3E3E3E').bold('[LEGACY] ')+'Carregando Objetos'));
  try {
    yarp.Blip = require('../classes/Blip.js');
    yarp.Character = require('../classes/Character.js');
    yarp.Checkpoint = require('../classes/Checkpoint.js');
    yarp.Colshape = require('../classes/Colshape.js');
    yarp.Command = require('../classes/Command.js');
    yarp.Door = require('../classes/Door.js');
    yarp.Event = require('../classes/Event.js');
    yarp.Group = require('../classes/Group.js');
    yarp.Job = require('../classes/Job.js');
    yarp.Hotkey = require('../classes/Hotkey.js');
    yarp.Item = require('../classes/Item.js');
    yarp.Label = require('../classes/Label.js');
    yarp.Location = require('../classes/Location.js');
    yarp.Marker = require('../classes/Marker.js');
    yarp.Npc = require('../classes/Npc.js');
    yarp.Pool = require('../classes/Pool.js');
    yarp.Prop = require('../classes/Prop.js');
    yarp.Transaction = require('../classes/Transaction.js');
    yarp.User = require('../classes/User.js');
    yarp.Variable = require('../classes/Variable.js');
    yarp.Vehicle = require('../classes/Vehicle.js');
    yarp.Weapon = require('../classes/Weapon.js');
    yarp.Realstate = require('../classes/Realstate.js');
    yarp.Crime = require('../classes/Crime.js');
    yarp.Acesslog = require('../classes/Acesslog.js');
    yarp.Garage = require('../classes/Garage.js');
  } catch(err) {
    console.log(chalk.redBright('[LEGACY] ')+'ClassError: '+err.message+'\n'+err.stack);
  }
};
