'use strict';

// 0x71 is the F2 key code
mp.keys.bind(0x71, false, function() {
    mp.events.callRemote('OpenPhone');
    mp.gui.chat.push('F2');
});

mp.keys.bind(0x73, false, function() {
    mp.gui.chat.push('F3');
    mp.events.call('getWaypointPosition');
});