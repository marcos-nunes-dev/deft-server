'use strict';
/**
 * Manage Weather time.
 */

const cicleTime = (yarp.variables['DayTick'].value)/120;
const timeInGame = cicleTime/24; //day In Hour
const cicleUpdate = timeInGame*60 *1000; //in Miliseconds
let hour = 7;
mp.world.time.hour = hour;


var customWeathers = [
	'EXTRASUNNY',
	'CLEAR',
	'CLOUDS',
	'SMOG',
	'FOGGY',
	'OVERCAST',
	'RAIN',
	'THUNDER',
	'CLEARING',
	'SNOW',
	'BLIZZARD',
	'SNOWLIGHT'
];

function dayClicle(){
	if(hour == 23){
		hour = 0;
		const randomWeather = Math.floor(Math.random() * customWeathers.length);  
		mp.world.weather = customWeathers[randomWeather];	
	}else {
		hour += 1;
		mp.world.time.hour = hour;
	}
	mp.players.forEach((player) => player.call('changeWeatherOnClient', [timeInGame, hour]));
	
	// console.log("h: "+hour);
	setTimeout(dayClicle, cicleUpdate);
}

dayClicle();