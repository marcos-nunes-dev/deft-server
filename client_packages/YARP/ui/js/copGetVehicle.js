//JOBS FUNCTIONS
function exit(){
    mp.trigger('destroyBrowser', 'cop_get_vehicle');
}

function copGetCar(){
    mp.trigger('copGetCar');
}

function copGetMoto(){
    mp.trigger('copGetMoto');
}

function copGetVan(){
    mp.trigger('copGetVan');
}

function copGetRanger(){
    mp.trigger('copGetRanger');
}