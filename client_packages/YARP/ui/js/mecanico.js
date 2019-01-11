//JOBS FUNCTIONS

function getTruck(){
    mp.trigger('getTruck');
}

function exit(){
    mp.trigger('destroyBrowser', 'mecanico_spawn');
}

function exitUni(){
    mp.trigger('destroyBrowser', 'mecanico_uniforme');
}

function setUniformMasc(){
	 mp.trigger('setUniformMasc');	
}

function setUniformFem(){
	 mp.trigger('setUniformFem');	
}