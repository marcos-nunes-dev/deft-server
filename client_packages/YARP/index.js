'use strict';
/**
 * @file Loads the gamemode on client-side.
 * @author Guilherme Caulada (Sighmir)
 * @copyright Copyright (C) 2018  Sighmir
 * @namespace client
 */

global.yarp = {}
yarp.utils = require('./YARP/modules/utils.js');

//RealState
require('./YARP/realstate/houses.js');

//Modules
require('./YARP/modules/fuelOnMove.js');
require('./YARP/modules/weather.js');
require('./YARP/modules/camAnimMenu.js');
require('./YARP/modules/commonFunctions.js');

//Load Job Interations
require('./YARP/jobInteractions/police.js');
require('./YARP/jobInteractions/taxi.js');
require('./YARP/jobInteractions/common.js');
require('./YARP/jobInteractions/mecanic.js');
require('./YARP/jobInteractions/rescue.js');
require('./YARP/jobInteractions/intel.js');
require('./YARP/jobInteractions/lawyer.js');
require('./YARP/jobInteractions/traffic.js');

//Load RAGE.MP Events
require('./YARP/events/ragemp/browser.js');
require('./YARP/events/ragemp/checkpoint.js');
require('./YARP/events/ragemp/colshape.js');
require('./YARP/events/ragemp/player.js');
require('./YARP/events/ragemp/stream.js');
require('./YARP/events/ragemp/ui.js');
require('./YARP/events/ragemp/vehicle.js');
require('./YARP/events/ragemp/waypoint.js');
require('./YARP/events/ragemp/keys.js');
require('./YARP/events/ragemp/notifications.js');

//Load YARP Events
require('./YARP/events/yarp/character.js');
require('./YARP/events/yarp/command.js');
require('./YARP/events/yarp/gamemode.js');
require('./YARP/events/yarp/menu.js');
require('./YARP/events/yarp/weapon.js');
