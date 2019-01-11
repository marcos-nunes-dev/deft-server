'use strict';

mp.events.add('beMecanic', (player) => {
  mp.events.callRemote("beMecanic", player);
});

mp.events.add('getTruck', (player) => {
  mp.events.callRemote("getTruck", player);
});

mp.events.add('setUniformMasc', (player) => {
  mp.events.callRemote("setUniformMasc", player);
});

mp.events.add('setUniformFem', (player) => {
  mp.events.callRemote("setUniformFem", player);
});