'use strict';
/**
 * Loads the events on server-side asynchronously.
 */

module.exports = async () => {
  // Loading events
  try {
    // Load RAGE.MP events
    console.log(chalk.hex('#3E3E3E').bold('[LEGACY] ')+'Carregando Realstate');
    require('../realstate/houses.js');
    require('../realstate/labels.js');
    require('../realstate/markers.js');

  } catch(err) {
    console.log(chalk.redBright('[LEGACY] ')+'EventError: '+err.message+'\n'+err.stack);
  }
};
