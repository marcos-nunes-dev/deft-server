'use strict';

// tick parameters | 1 = 0.5s | 120 = 1m | 7200 = 1h      

const dayTick = 3600; //30 Minutos
const hourTick = dayTick/24;
const minuteTick = hourTick/60;

let config = {
  'maxPistolAmmo': 65,
  'washCar': 25,
  'hospitalCost': 15,
  'deathCost': 5,
  'taxiCostPerSecond': 0.1666, // ~ 10 reais a cada 1 minuto
  'Whitelisted': false,
  'Starting Wallet': 100,
  'Starting Bank': 1500,
  'Save Interval': 20, //A tick is 0.5s so 20 = 10 seconds
  'Hunger Interval': 20,
  'Hunger Rate': 1,
  'Thirst Interval': 20,
  'Thirst Rate': 1,
  'XP Interval': 600 * 2, // 10 minutes because a tick is 0.5s
  'XP Rate': 10,
  'Max Weight': 30,
  'DayTick': dayTick,
  'HourTick': hourTick,
  'MinuteTick': minuteTick,
  'First Spawn': new mp.Vector3(-888.8746, -2313.2836, 3.5077),
  'First Heading': 90,
  'Fuel Timer': 60, //30 seg em 30 seg
  'Fuel Price': 10, //Price per tick | Full Tank = 100
  'Spawns': [
    new mp.Vector3(1839.6, 3672.93, 34.28),
    new mp.Vector3(-247.76, 6331.23, 32.43),
    new mp.Vector3(-449.67, -340.83, 34.50),
    new mp.Vector3(357.43, -593.36, 28.79),
    new mp.Vector3(295.83, -1446.94, 29.97),
    new mp.Vector3(-676.98, 310.68, 83.08),
    new mp.Vector3(1151.21, -1529.62, 35.37),
    new mp.Vector3(-874.64, -307.71, 39.58)
  ]
}

module.exports = config;
