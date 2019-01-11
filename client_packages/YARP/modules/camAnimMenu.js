'use strict';

let editorCamera = null;
let gameplayCam = null;

mp.events.add('OpenPhone', (player, char) => {
  const x = char._position.x + 1.0;
  const y = char._position.y - 3.0;
  const z = char._position.z + 0.0;

  /*if (!gameplayCam) {
    mp.gui.chat.push(`gam`);
    gameplayCam = mp.cameras.new("gameplay", new mp.Vector3(x, y, z), new mp.Vector3(0, 0, 0), 40);
    gameplayCam.setActive(true);
    //gameplayCam.attachTo(player, 0, 0, 0, true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
  }*/
  
  if (editorCamera) {
    mp.gui.chat.push(`destroy`);
    editorCamera.setActive(false);
    editorCamera.destroy();
    editorCamera = null;
    mp.game.cam.renderScriptCams(false, true, 1500, false, false);
    return;
  }

	editorCamera = mp.cameras.new('phone');
  editorCamera.setActive(true);
  editorCamera.attachTo(player.handle, 0.7, -1.5, 0.4, false);
  mp.game.cam.renderScriptCams(true, true, 1500, true, false);
});

