'use strict';
/**
 * Loads the events on server-side asynchronously.
 */

module.exports = async () => {
  // Loading events
  try {
    // Load RAGE.MP events
    console.log(chalk.hex('#3E3E3E').bold('[LEGACY] ')+'Carregando functions');
    
    require('../functions/weather.js');
    require('../functions/camAnimMenu.js');
    require('../functions/commonFunctions.js');

  } catch(err) {
    console.log(chalk.redBright('[LEGACY] ')+'EventError: '+err.message+'\n'+err.stack);
  }
};
