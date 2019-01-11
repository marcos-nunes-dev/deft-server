'use strict';
/**
 * Loads the events on server-side asynchronously.
 */

module.exports = async () => {
  // Loading events
  try {
    // Load RAGE.MP events
    console.log(chalk.hex('#3E3E3E').bold('[LEGACY] ')+'Carregando Job Interactions');
    require('../jobInteractions/police.js');
    require('../jobInteractions/taxi.js');
    require('../jobInteractions/common.js');
    require('../jobInteractions/mecanic.js');
    require('../jobInteractions/rescue.js');
    require('../jobInteractions/intel.js');
    require('../jobInteractions/lawyer.js');
    require('../jobInteractions/traffic.js');

  } catch(err) {
    console.log(chalk.redBright('[LEGACY] ')+'EventError: '+err.message+'\n'+err.stack);
  }
};
