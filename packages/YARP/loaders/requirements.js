'use strict';
/**
 * Loads the requirements on server-side asynchronously.
 */

module.exports = async () => {
  // Loading requirements
  console.log(chalk.hex('#3E3E3E').bold('[LEGACY] ')+'Carregando Requirements');
  try {
    yarp.utils = require('../modules/utils.js');
    yarp.jobRequest = require('../modules/jobRequest.js');
    yarp.db = require('../modules/mongo.js');
    yarp.mng = require('../modules/manager.js');
    yarp.GMObject = require('../classes/GMObject.js');
    await yarp.db.connect('mongodb://localhost:27017/yarp');
  } catch(err) {
    console.log(chalk.redBright('[LEGACY] ')+'RequirementError: '+err.message+'\n'+err.stack);
  }
};
