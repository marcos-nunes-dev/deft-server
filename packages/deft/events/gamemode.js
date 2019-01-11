
const pools = require('../modules/pools');

let tickCount = 0;

function tick() {
  pools.vehicles.forEach((vehicle) => {
    if (tickCount % 5 == 0) {
      try {
        vehicle.save();
      } catch (err) {
        console.log(`error!!`, err)
        console.log(err)
      }
    }
  })

  tickCount++;
  if (tickCount == Number.MAX_SAFE_INTEGER) tickCount = 0;

  setTimeout(tick, 1000);
}

tick();
