'use strict';
/**
 * Loads the events on server-side asynchronously.
 */
deft.Vehicle = require('../../deft/classes/Vehicle');

module.exports = async () => {
    // Loading events
    try {
        // Load RAGE.MP events
        console.log(chalk.hex('#3E3E3E').bold('[LEGACY] ') + 'Carregando Deft on Tarp');
        deft.Vehicle = require('../../deft/classes/Vehicle');

    } catch (err) {
        console.log(chalk.redBright('[LEGACY] ') + 'EventError: ' + err.message + '\n' + err.stack);
    }
};

