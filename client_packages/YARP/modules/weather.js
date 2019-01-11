'use strict';

let hour = 7;
let minute = 0;
let second = 0;
let timeInGame = 0;
let timeInGameMinute = 0;
let timeInGameSecond = 0;
let cicleUpdate = 0;

mp.events.add('changeWeatherOnClient', (timeInGameServer, worldHour) => {
	timeInGame = timeInGameServer; //day In Hour
	timeInGameMinute = timeInGame/60; //day In Minute
	timeInGameSecond = timeInGameMinute/60; //day In Minute
	cicleUpdate = timeInGameSecond*60 *1000; //in Miliseconds
	hour = worldHour;
	minute = 0;
	second = 0;
	mp.game.time.setClockTime(hour, minute, second);
});

function dayClicle(){
	if(second==59){
		second = 0;
		if(minute==59){		
			minute = 0;
			if(hour == 23){
				hour = 0;			
			}else {
				hour += 1;
				mp.game.time.setClockTime(hour, minute, second);
			}
		}else{
			minute += 1;
			mp.game.time.setClockTime(hour, minute, second);
		}
	}else {
		second += 1;
		mp.game.time.setClockTime(hour, minute, second);
	}

	// mp.gui.chat.push("h:"+hour+" m:"+minute+" s:"+second);   DEBUG
	setTimeout(dayClicle, cicleUpdate);
}

dayClicle();