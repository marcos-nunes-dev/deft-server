const chalk = require('chalk');

(async () => {
  console.log(chalk.hex('#00ec90').bold('[DEFT:RAGE] ') + 'Loading database...');
  const database = require('./modules/database');
  await database.connect();

  console.log(chalk.hex('#00ec90').bold('[DEFT:RAGE] ') + 'Loading pools...');
  const pools = require('./modules/pools');
  await pools.initializeFromDatabase();
  
  console.log(chalk.hex('#00ec90').bold('[DEFT:RAGE] ') + 'Loading events...');
  require('./events/commands');
  require('./events/gamemode');
  require('./events/vehicle');

  console.log(chalk.hex('#00ec90').bold('[DEFT:RAGE] ') + 'Loading Functions...');
  require('./functions/commonFunctions');

  // Loading complete
  console.log(chalk.greenBright('[DEFT:RAGE] ') + 'Carregamento Concluido');
})();