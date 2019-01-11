'use strict';
/**
 * @file Loads the gamemode on server-side.
 * @author Guilherme Caulada (Sighmir)
 * @copyright Copyright (C) 2018  Sighmir
 * @namespace server
 */

/**
 * @namespace yarp
 */
global.yarp = {};
global.deft = {};
global.chalk = require('chalk');

/**
 * Loads the gamemode asynchronously.
 * @async
 * @function
 */
(async () => {
  // Loading Deft
  await require('./loaders/deft.js');
  
  // Loading requirements
  await require('./loaders/requirements.js')();

  // Loading classes
  await require('./loaders/classes.js')();

  // Loading pools
  await require('./loaders/pools.js')();

  // Loading data
  await require('./loaders/data.js')();

  // Loading configs
  await require('./loaders/configs.js')();

  // Loading events
  await require('./loaders/events.js')();

    // Loading job interactions
  await require('./loaders/jobInteractions.js')();

      // Loading realstate
  await require('./loaders/realstate.js')();

   // Loading functions
  await require('./loaders/functions.js')();

  // Loading complete
  console.log(chalk.hex('#3E3E3E').bold('[LEGACY] ')+'Carregamento Concluido');

  // Rejoin players
  mp.players.forEach((player, i) => {
    mp.events.call('playerJoin', player)
  });
})();

const exit = async () => {
  console.log(chalk.redBright('[LEGACY] ')+'Encerrando servidor... vlw flws');
  await mp.players.broadcast(`!{red}The server is closing. Rejoin with F1.`);
  for (let player of mp.players.toArray()) {
    player.kick('The server is closing.');
    console.log(`${player.name}(${player.socialClub}/${player.ip}) quit. Reason: The server is closing. (kicked)`)
  }
  process.exit();
}

process.on('SIGHUP', exit);
process.on('SIGKILL', exit);
process.on('SIGQUIT', exit);
process.on('SIGTERM', exit);
process.on('SIGINT', exit);
