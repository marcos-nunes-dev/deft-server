'use strict';

/*********************COMANDOS DE TESTE****************************/

mp.events.addCommand("bh", (player) => {
	player.call("bodyHealth", [player]);
});

mp.events.add("vehDam", (player, vehDam) => {	
	console.log("asd"+vehDam);
});

mp.events.addCommand("dirtymoney", (player) => {
    const char = yarp.characters[player.name];
    char.giveDirtyMoney(500);
    char.save();
    char.notifyWithText("Você recebeu R$500,00 de dinheiro Sujo.", false, 6);   
});

mp.events.addCommand("crimetest", (player) => {
	let crime = new yarp.Crime({
	    id: "Crime",
	    character: player.name,
	    type: "Assalto",
	    description: "Assaltou o doidao com uma arma",
	    time: 4,
	    charge: 0
	});   
	crime.save();  
});

mp.events.addCommand("acesstest", (player) => {
	const char = yarp.characters[player.name];

	let acess = new yarp.Acesslog({
	    id: "Crime",
	    character: player.name,
	    jobClass: yarp.utils.characterJobClass(char.jobs[0]),
	    dateTime: yarp.utils.getTimestamp(new Date())
	});   
	acess.save();  
});


/*********************LIMPAR DAQUI PARA CIMA****************************/

mp.events.add("alreadyJob", (player) => {
    const char = yarp.characters[player.name];
    const job = char.jobs;
    const jobClass = yarp.utils.characterJobClass(job[0]);
    const jobInfo = yarp.jobs[job[0]];
    switch(jobClass) {
	    case "Mecanico":
	        char.notifyWithPicture("Você já tem Emprego", jobInfo.label, "Use o celular para sair do seu emprego atual.", "CHAR_LS_CUSTOMS");
	        break;
	    case "Taxista":
	        char.notifyWithPicture("Você já tem Emprego", jobInfo.label, "Use o celular para sair do seu emprego atual.", "CHAR_TAXI");
	        break;   	    
	    case "Resgate":
	        char.notifyWithPicture("Você já tem Emprego", jobInfo.label, "Use o celular para sair do seu emprego atual.", "CHAR_CALL911");
	        break;
	    case "Policial":
	        char.notifyWithPicture("Você já tem Emprego", jobInfo.label, "Use o celular para sair do seu emprego atual.", "CHAR_CALL911");
	        break;
	    case "Inteligência":
	        char.notifyWithPicture("Você já tem Emprego", jobInfo.label, "Use o celular para sair do seu emprego atual.", "CHAR_BLANK_ENTRY");
	        break;
	    case "Transito":
	        char.notifyWithPicture("Você já tem Emprego", jobInfo.label, "Use o celular para sair do seu emprego atual.", "CHAR_BLANK_ENTRY");
	        break;
	    default:
	        char.notifyWithPicture("Você já tem Emprego", "Balcão de Empregos", "Use o celular para sair do seu emprego atual.", "CHAR_BLOCKED");
	}

});