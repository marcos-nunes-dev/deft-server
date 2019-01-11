'use strict';


//IMPORTA LABELS DE PROPRIEDADE
const arrayHouses = yarp.realstates.toArray();
const realEstateConfig = {};

for (var i = arrayHouses.length - 1; i >= 0; i--) {
    const pos = arrayHouses[i]._entranceOnFoot.split(',').map(x => parseInt(x.trim()));
    const pos2 = arrayHouses[i]._entranceVehicle.split(',').map(x => parseInt(x.trim()));

    const house = yarp.realstates.at(arrayHouses[i]._id);

    realEstateConfig[arrayHouses[i]._label] = {
        enter: (`(houseJSON => ${(player => {
          const house = JSON.parse(houseJSON);
          player.call('displayHelpText', ['~INPUT_PICKUP~ para Entrar no '+house._label]);
          yarp.hotkeys['Event'].bind(player, ['enterRealstate', [house]]);
        })})('${JSON.stringify(arrayHouses[i])}')`),
            leave: (player) => {
                player.call('clearHelpText');
                yarp.hotkeys['Event'].unbind(player);
            },
            visible: false,
            text: "~w~Entrada ~n~ ~c~" + arrayHouses[i]._label,
            positions: [
                new mp.Vector3(pos[0], pos[1], pos[2])
            ],
        },

        realEstateConfig[arrayHouses[i]._label + " vehicle"] = {
            enter: (`(houseJSON => ${(player => {
              const house = JSON.parse(houseJSON);
              player.call('displayHelpText', ['~INPUT_PICKUP~ para Garagem do '+house._label]);
              yarp.hotkeys['Event'].bind(player, ['enterRealstateGarage', [house]]);
            })})('${JSON.stringify(arrayHouses[i])}')`),
            leave: (player) => {
                player.call('clearHelpText');
                yarp.hotkeys['Event'].unbind(player);
            },
            visible: false,
            text: "~w~Garagem ~n~ ~c~" + arrayHouses[i]._label,
            positions: [
                new mp.Vector3(pos2[0], pos2[1], pos2[2])
            ],
        }

}


//IMPORTA LABELS PADRÃO
let config = {

    ...realEstateConfig,

    /*
     ***************************** TRABALHOS LEGAIS ****************************
     */
    'Legal-jobs': {
        enter: (player) => {
            player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para Entrar.']);
            yarp.hotkeys['Event'].bind(player, ['createBrowser', ['jobs', ['package://YARP/ui/html/legalJobs.html']]]);
        },
        leave: (player) => {
            player.call('clearHelpText');
            player.call('destroyBrowser', ['jobs']);
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Balcão de Empregos ~n~ ~c~Inicie sua Carreira ",
        positions: [
            new mp.Vector3(-267.7383728027344, -958.3084716796875, 31.223133087158203)
        ],
    },


    /*
     ***************************** TRABALHOS ILEGAIS ****************************
     */
    'ilegal-jobs': {
        enter: (player) => {
            player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para Entrar.']);
            yarp.hotkeys['Event'].bind(player, ['createBrowser', ['ilegal-jobs', ['package://YARP/ui/html/ilegalJobs.html']]]);
        },
        leave: (player) => {
            player.call('clearHelpText');
            player.call('destroyBrowser', ['ilegal-jobs']);
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Balcão de Empregos Ilegal ~n~ ~c~Inicie sua Carreira Criminosa ",
        positions: [
            new mp.Vector3(707.2880859375, -966.9572143554688, 30.41285514831543)
        ],
    },

    /*
     ***************************** BANCO ****************************
     */

    'Bank': {
        enter: (player) => {
            player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para Entrar.']);
            yarp.hotkeys['Event'].bind(player, ['createBrowser', ['bank', ['package://YARP/ui/html/bankMenu.html']]]);
        },
        leave: (player) => {
            player.call('clearHelpText');
            player.call('destroyBrowser', ['bank']);
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Banco ~n~ ~c~Transações Financeiras ",
        positions: [
            new mp.Vector3(149.59552001953125, -1040.6197509765625, 29.37409019470215),
            new mp.Vector3(-2962.884765625, 482.7693786621094, 15.703097343444824),
            new mp.Vector3(-113.17153930664062, 6470.06494140625, 31.626710891723633),
            new mp.Vector3(-1212.9664306640625, -330.5686950683594, 37.787025451660156),
            new mp.Vector3(-350.7787780761719, -49.66300964355469, 49.042579650878906),
            new mp.Vector3(314.3157958984375, -278.84136962890625, 54.17078399658203),
            new mp.Vector3(1175.08056640625, 2706.74853515625, 38.094032287597656),
            new mp.Vector3(237.11801147460938, 217.43899536132812, 106.28675842285156)
        ],
    },

    'ATM': {
        enter: (player) => {
            player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para Entrar.']);
            yarp.hotkeys['Event'].bind(player, ['createBrowser', ['atm', ['package://YARP/ui/html/bankMenu.html']]]);
        },
        leave: (player) => {
            player.call('clearHelpText');
            player.call('destroyBrowser', ['atm']);
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Caixa Eletrônico ~n~ ~c~Transações Financeiras ",
        positions: [
            new mp.Vector3(89.577018737793, 2.16031360626221, 68.322021484375),
            new mp.Vector3(-526.497131347656, -1222.79455566406, 18.4549674987793),
            new mp.Vector3(-2072.48413085938, -317.190521240234, 13.315972328186),
            new mp.Vector3(-821.565551757813, -1081.90270996094, 11.1324348449707),
            new mp.Vector3(1686.74694824219, 4815.8828125, 42.0085678100586),
            new mp.Vector3(-386.899444580078, 6045.78466796875, 31.5001239776611),
            new mp.Vector3(1171.52319335938, 2702.44897460938, 38.1754684448242),
            new mp.Vector3(1968.11157226563, 3743.56860351563, 32.3437271118164),
            new mp.Vector3(2558.85815429688, 351.045166015625, 108.621520996094),
            new mp.Vector3(1153.75634765625, -326.805023193359, 69.2050704956055),
            new mp.Vector3(-56.9172439575195, -1752.17590332031, 29.4210166931152),
            new mp.Vector3(-3241.02856445313, 997.587158203125, 12.5503988265991),
            new mp.Vector3(-1827.1884765625, 784.907104492188, 138.302581787109),
            new mp.Vector3(-1091.54748535156, 2708.55786132813, 18.9437484741211),
            new mp.Vector3(112.45637512207, -819.25048828125, 31.3392715454102),
            new mp.Vector3(-256.173187255859, -716.031921386719, 33.5202751159668),
            new mp.Vector3(174.227737426758, 6637.88623046875, 31.5730476379395),
            new mp.Vector3(-660.727661132813, -853.970336914063, 24.48407363891)
        ],
    },

    /*
     ***************************** MECANICO ****************************
     */
    'restoreMecanic': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Mecanico")) {
                player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para recuperar o Veiculo.']);
                if (player.vehicle) {
                    yarp.hotkeys['Event'].bind(player, ['recoverVehicle']); // NÃO ESTÁ CHAMANDO FUNÇÃO
                } else {
                    char.notifyWithPicture("Cade o veiculo?", "Mecânico", "Pegue um caminhão e reboque o veículo até aqui e entre no veículo.", "CHAR_BLOCKED");
                }
            } else {
                char.notifyWithPicture("Você não é Mecânico", "Oficina", "Ei amigo, você não é um mecânico! Para usar nossa oficina vá até o balcão de empregos.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Recuperar Veículo ~n~ ~c~Area Restrita ",
        positions: [
            new mp.Vector3(488.5623474121094, -1399.9097900390625, 29.28117561340332)
        ],
    },

    'UniformMecanic': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Mecanico")) {
                player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para se Vestir.']);
                yarp.hotkeys['Event'].bind(player, ['createBrowser', ['mecanico_uniforme', ['package://YARP/ui/html/mecanico_uniforme.html']]]);
            } else {
                char.notifyWithPicture("Você não é Mecânico", "Oficina", "Ei amigo, você não é um mecânico! Para usar nossa oficina vá até o balcão de empregos.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            player.call('destroyBrowser', ['mecanico_uniforme']);
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Vestiário Mecânico ~n~ ~c~Area Restrita ",
        positions: [
            new mp.Vector3(479.2392272949219, -1326.32568359375, 29.20749282836914)
        ],
    },

    'Mecanic': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Mecanico")) {
                player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para Entrar.']);
                yarp.hotkeys['Event'].bind(player, ['createBrowser', ['mecanico_spawn', ['package://YARP/ui/html/mecanico_spawn.html']]]);
            } else {
                char.notifyWithPicture("Você não é Mecânico", "Oficina", "Ei amigo, você não é um mecânico! Para usar nossa oficina vá até o balcão de empregos.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            player.call('destroyBrowser', ['mecanico_spawn']);
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Oficina Mecânica ~n~ ~c~Area Restrita ",
        positions: [
            new mp.Vector3(491.42999267578125, -1333.298095703125, 29.33223533630371),
            new mp.Vector3(1252.14453125, 2737.519775390625, 38.487953186035156),
            new mp.Vector3(-23.935808181762695, 6458.69384765625, 30.699481964111328),
            new mp.Vector3(1918.9984130859375, 3900.41748046875, 32.20954895019531)
        ],
    },

    /*
     ****************************** RESGATE ****************************
     */

    'Resgate-Vestiario': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Resgate")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para Vestir seu Uniforme.']);
                yarp.hotkeys['Event'].bind(player, ['rescueGetUniform']);
            } else {                
                char.notifyWithPicture("Você não é do Resgate", "Corp. Resgate", "Se sua vontade de salvar outras pessoas é tão grande porque não vai até o balcão de empregos.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Vestiário ~n~ ~c~Central de Resgate",
        positions: [
            new mp.Vector3(198.98533630371094, -1649.986572265625, 29.80321502685547)
        ],
    },
    'Resgate-Vehicle': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Resgate")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para pegar/guardar a Ambulancia.']);
                yarp.hotkeys['Event'].bind(player, ['rescueGetVehicle']);
            } else {                
                char.notifyWithPicture("Você não é do Resgate", "Corp. Resgate", "Se sua vontade de salvar outras pessoas é tão grande porque não vai até o balcão de empregos.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Garagem ~n~ ~c~Central de Resgate",
        positions: [
            new mp.Vector3(201.74826049804688, -1656.2735595703125, 29.80321502685547)
        ],
    },
    'Resgate-Helicoptero': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Resgate")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para Pegar/Guardar o Águia.']);
                yarp.hotkeys['Event'].bind(player, ['rescueGetChopper']);
            } else {                
                char.notifyWithPicture("Você não é do Resgate", "Corp. Resgate", "Se sua vontade de salvar outras pessoas é tão grande porque não vai até o balcão de empregos.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Helli-Ponto ~n~ ~c~Corp. Resgate",
        positions: [
            new mp.Vector3(313.1593933105469, -1465.190673828125, 46.509490966796875)
        ],
    },

    /*
     **************************** LAVA-JATO ****************************
     */

    'Car-wash': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (player.vehicle) {
                player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para Lavar o Veiculo.']);
                yarp.hotkeys['Event'].bind(player, ['washVehicle']);
            } else {
                char.notifyWithPicture("Cade o veiculo?", "Lava Jato", "Ei amigo, você não tem um veiculo! Volte quando tiver um.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Lava Jato ~n~ ~c~Limpe seu Veiculo ",
        positions: [
            new mp.Vector3(26.5906, -1392.0261, 29.3634),
            new mp.Vector3(167.1034, -1719.4704, 29.2916),
            new mp.Vector3(-74.5693, 6427.8715, 31.4400),
            new mp.Vector3(-699.6325, -932.7043, 19.0139)
        ],
    },
    /*
     ***************************** POLICIA ****************************
     */

    'Policia-PC': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Policial") || yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para usar o LS:PC.']);
                yarp.hotkeys['Teleport'].bind(player);
            } else {
                char.notifyWithPicture("Você não é Policial", "Delegacia", "Ei amigo, você não é policial! Para usar nossa delegacia prove seu valor.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Usar LS:PC ~n~ ~c~Delegacia Policial",
        positions: [
            new mp.Vector3(448.0732116699219, -973.1594848632812, 30.689603805541992),
            new mp.Vector3(459.5604248046875, -988.7882080078125, 24.914865493774414),
            new mp.Vector3(441.9493103027344, -978.3349609375, 30.689603805541992)
        ],
    },
    'Policia-AcessBoard': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Policial")) {
                player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para Livro de Ponto.']);
                yarp.hotkeys['Teleport'].bind(player);
            } else {
                if (yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                    char.notifyWithPicture("Este não é seu Board", "Agente X", "Este não é seu board agente, vá até sua sala para visualizar o seu.", "CHAR_BLANK_ENTRY");
                } else {
                    char.notifyWithPicture("Você não é Policial", "Delegacia", "A Policia dessa cidade escreve em códigos, você não vai conseguir entender.", "CHAR_BLOCKED");
                }
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Livro de Ponto ~n~ ~c~Delegacia Policial",
        positions: [
            new mp.Vector3(447.441650390625, -985.152099609375, 26.67421531677246)
        ],
    },
    'Policia-Armamento': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Policial") || yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para Pegar Armamento Leve.']);
                yarp.hotkeys['Event'].bind(player, ['copGetLightWeapons']);
            } else {
                char.notifyWithPicture("Você não é Policial", "Delegacia", "O alarme tocou! Se eu fosse você sairia correndo dai!", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Armamento Leve ~n~ ~c~Delegacia/Investigação",
        positions: [
            new mp.Vector3(460.0751953125, -979.424072265625, 30.689584732055664)
        ],
    },
    'Policia-Vestiario': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Policial")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para Vestir seu Uniforme.']);
                yarp.hotkeys['Event'].bind(player, ['copGetUniform']);
            } else {
                if (yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                    char.notifyWithPicture("Este não é seu Armário", "Agente X", 'Quer se vestir de "soldadinho" agente?', "CHAR_BLANK_ENTRY");
                } else {
                    char.notifyWithPicture("Você não é Policial", "Delegacia", "O alarme tocou! Se eu fosse você sairia correndo dai!", "CHAR_BLOCKED");
                }
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Vestiário ~n~ ~c~Delegacia Policial",
        positions: [
            new mp.Vector3(457.83154296875, -992.6342163085938, 30.68960189819336)
        ],
    },
    'Policia-Helicoptero': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Policial")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para Pegar/Guardar o Águia.']);
                yarp.hotkeys['Event'].bind(player, ['copGetChopper']);
            } else {
                if (yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                    char.notifyWithPicture("Está louco agente?", "Agente X", "Somos invisíveis! Não precisamos voar.", "CHAR_BLANK_ENTRY");
                } else {
                    char.notifyWithPicture("Você não é Policial", "Delegacia", "O alarme tocou! Se eu fosse você sairia correndo dai!", "CHAR_BLOCKED");
                }
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Helli-Ponto ~n~ ~c~Delegacia Policial",
        positions: [
            new mp.Vector3(449.3399963378906, -981.3216552734375, 43.69167709350586)
        ],
    },
    'Policia-GuardarVehi': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Policial")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para guardar seu Veículo.']);
                yarp.hotkeys['Event'].bind(player, ['copSaveVehicle']);
            } else {
                if (yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                    char.notifyWithPicture("Garagem Errada", "Agente X", "Está bebado agente? a sua fica ao lado.", "CHAR_BLANK_ENTRY");
                } else {
                    char.notifyWithPicture("Você não é Policial", "Delegacia", "O alarme tocou! Se eu fosse você sairia correndo dai!", "CHAR_BLOCKED");
                }
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Guardar Veículo ~n~ ~c~Delegacia Policial",
        positions: [
            new mp.Vector3(452.45208740234375, -996.8555297851562, 25.76563835144043),
            new mp.Vector3(447.2713317871094, -997.022705078125, 25.76369857788086)
        ],
    },
    'Policia-PegarVehi': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Policial")) {
                if (player.vehicle) {
                    char.notifyWithPicture("Está Louco?", "Delegado Geral", "Você já está em um veículo Oficial! Está fumando as drogas que apreendemos?", "CHAR_MP_ARMY_CONTACT");
                } else {
                    player.call('displayHelpText', ['~INPUT_PICKUP~ para Pegar seu Veículo.']);
                    yarp.hotkeys['Event'].bind(player, ['createBrowser', ['cop_get_vehicle', ['package://YARP/ui/html/copGetVehicle.html']]]);
                }
            } else {
                if (yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                    char.notifyWithPicture("Garagem Errada", "Agente X", "Está bebado agente? a sua fica ao lado.", "CHAR_BLANK_ENTRY");
                } else {
                    char.notifyWithPicture("Você não é Policial", "Delegacia", "O alarme tocou! Se eu fosse você sairia correndo dai!", "CHAR_BLOCKED");
                }
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            player.call('destroyBrowser', ['cop_get_vehicle']);
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Pegar Veículo ~n~ ~c~Delegacia Policial",
        positions: [
            new mp.Vector3(436.55780029296875, -996.91796875, 25.76554298400879),
            new mp.Vector3(431.2478332519531, -996.5816650390625, 25.770980834960938)
        ],
    },
    'Policia-Cadeia': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Policial")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para Prender.']);
                yarp.hotkeys['Teleport'].bind(player);
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Cadeia ~n~ ~c~Delegacia Policial",
        positions: [
            new mp.Vector3(458.9058837890625, -1001.5479125976562, 24.91484832763672),
            new mp.Vector3(458.809814453125, -997.8944702148438, 24.91485023498535),
            new mp.Vector3(460.15997314453125, -994.47119140625, 24.91484832763672)
        ],
    },

    /*
     ***************************** HOSPITAL ****************************
     */

    'Hospital': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            player.call('displayHelpText', ['~INPUT_PICKUP~ para se Curar.']);
            yarp.hotkeys['Event'].bind(player, ['healPlayer']);

        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Hospital ~n~ ~c~Regenerar Vida",
        positions: [
            new mp.Vector3(1839.6, 3672.93, 34.28),
            new mp.Vector3(-247.76, 6331.23, 32.43),
            new mp.Vector3(-449.67, -340.83, 34.50),
            new mp.Vector3(357.43, -593.36, 28.79),
            new mp.Vector3(295.83, -1446.94, 29.97),
            new mp.Vector3(-676.98, 310.68, 83.08),
            new mp.Vector3(1151.21, -1529.62, 35.37),
            new mp.Vector3(-874.64, -307.71, 39.58)
        ],
    },

    /*
     ***************************** INTEL ****************************
     */
    'Intel-Vestiario': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para Vestir seu Uniforme.']);
                yarp.hotkeys['Event'].bind(player, ['intelGetUniform']);
            } else {
                char.notifyWithPicture("Você não é Intel", "Delegacia", "Aqui é só para os fortes quem tem cérebro.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Vestiário ~n~ ~c~Serviço de Inteligência",
        positions: [
            new mp.Vector3(450.7949523925781, -992.501953125, 30.689607620239258)
        ],
    },
    'Intel-AcessBoard': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para Livro de Ponto.']);
                yarp.hotkeys['Teleport'].bind(player);
            } else {
                char.notifyWithPicture("Você não é Policial", "Delegacia", "A Policia dessa cidade escreve em códigos, você não vai conseguir entender.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Livro de Ponto ~n~ ~c~Serviço de Inteligência",
        positions: [
            new mp.Vector3(441.9698181152344, -995.58447265625, 30.689603805541992)
        ],
    },
    'Intel-GuardarVehi': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para guardar seu Veículo.']);
                yarp.hotkeys['Event'].bind(player, ['intelSaveVehicle']);
            } else {
                char.notifyWithPicture("Você não é Policial", "Delegacia", "O alarme tocou! Se eu fosse você sairia correndo dai!", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Guardar Veículo ~n~ ~c~Serviço de Inteligência",
        positions: [
            new mp.Vector3(462.37139892578125, -1019.6430053710938, 27.82442283630371),
        ],
    },
    'Intel-PegarVehi': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (yarp.utils.hasJobClass(char.jobs, "Inteligencia")) {
                player.call('displayHelpText', ['~INPUT_PICKUP~ para Pegar seu Veículo.']);
                yarp.hotkeys['Event'].bind(player, ['intelGetVehicle']);
            } else {
                char.notifyWithPicture("Você não é Policial", "Delegacia", "O alarme tocou! Se eu fosse você sairia correndo dai!", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Pegar Veículo ~n~ ~c~Serviço de Inteligência",
        positions: [
            new mp.Vector3(462.42706298828125, -1014.474853515625, 27.804101943969727),
        ],
    },

    /*
     **************************** POSTO DE GASOLINA ****************************
     */

    'Posto-Gasolina': {
        enter: (player) => {
            const char = yarp.characters[player.name];
            if (player.vehicle) {
                const veh = deft.Vehicle.instanceByNumberPlate(player.vehicle.numberPlate);
                const price = (100 - veh.fuel) * yarp.variables['Fuel Price'].value;
                char.notifyWithPicture("Custará R$"+price, "Posto de Gasolina", "Fala chefia! Para encher o tanque de gasolina vai custar isso ai! Vamo completa?", yarp.utils.randomCharImg("M"));
               
                player.call('displayHelpText', ['Aperte ~INPUT_PICKUP~ para encher o tanque.']);
                yarp.hotkeys['Event'].bind(player, ['fillFuel']);
            } else {
                char.notifyWithPicture("Cade o veiculo?", "Posto de Gasolina", "Ei amigo, você não tem um veiculo! Volte quando tiver um.", "CHAR_BLOCKED");
            }
        },
        leave: (player) => {
            player.call('clearHelpText');
            yarp.hotkeys['Event'].unbind(player);
        },
        visible: false,
        text: "~w~Posto de Gasolina ~n~ ~c~Encha o tanque. ",
        positions: [
          new mp.Vector3(49.41872, 2778.793, 58.04395),
          new mp.Vector3(263.8949, 2606.463, 44.98339),
          new mp.Vector3(1039.958, 2671.134, 39.55091),
          new mp.Vector3(1207.26, 2660.175, 37.89996),
          new mp.Vector3(2539.685, 2594.192, 37.94488),
          new mp.Vector3(2679.858, 3263.946, 55.24057),
          new mp.Vector3(2005.055, 3773.887, 32.40393),
          new mp.Vector3(1687.156, 4929.392, 42.07809),
          new mp.Vector3(1701.314, 6416.028, 32.76395),
          new mp.Vector3(179.8573, 6602.839, 31.86817),
          new mp.Vector3(-94.46199, 6419.594, 31.48952),
          new mp.Vector3(-2554.996, 2334.402, 33.07803),
          new mp.Vector3(-1800.375, 803.6619, 138.6512),
          new mp.Vector3(-1437.622, -276.7476, 46.20771),
          new mp.Vector3(-2096.243, -320.2867, 13.16857),
          new mp.Vector3(-724.6192, -935.1631, 19.21386),
          new mp.Vector3(-526.0198, -1211.003, 18.18483),
          new mp.Vector3(-70.21484, -1761.792, 29.53402),
          new mp.Vector3(265.6484, -1261.309, 29.29294),
          new mp.Vector3(819.6538, -1028.846, 26.40342),
          new mp.Vector3(1208.951, -1402.567, 35.22419),
          new mp.Vector3(1181.381, -330.8471, 69.31651),
          new mp.Vector3(620.8434, 269.1009, 103.0895),
          new mp.Vector3(2581.321, 362.0393, 108.4688),
          new mp.Vector3(1785.363, 3330.372, 41.38188),
          new mp.Vector3(-319.690, -1471.610, 30.030),
          new mp.Vector3(174.880, -1562.450, 28.740),
          new mp.Vector3(1246.480, -1485.450, 34.900),
          new mp.Vector3(-66.330, -2532.570, 6.140)
        ],
    },
    'Ammu-Nation': {
      enter: (player) => {
        player.call('displayHelpText',['Press ~INPUT_PICKUP~ to shop.']);
        let location = yarp.locations[this.id];
        yarp.hotkeys['Event'].bind(player,['createBrowser', ['menu', ['package://YARP/ui/html/sideMenu.html', 'populateSaleCategories', location.id,JSON.stringify(location.sale)]]]);
      },
      leave: (player) => {
        player.call('clearHelpText');
        player.call('destroyBrowser',['menu']);
        yarp.hotkeys['Event'].unbind(player);
      },
      visible: false,
      text: "Ammu-Nation",
      positions: [
        new mp.Vector3(1692.41, 3758.22, 34.7053),
        new mp.Vector3(252.696, -48.2487, 69.941),
        new mp.Vector3(844.299, -1033.26, 28.1949),
        new mp.Vector3(-331.624, 6082.46, 31.4548),
        new mp.Vector3(-664.147, -935.119, 21.8292),
        new mp.Vector3(2569.62, -294.453, 108.735),
        new mp.Vector3(21.70, -1107.41, 29.79),
        new mp.Vector3( 810.15, -2156.88, 29.61),
        new mp.Vector3(-3172.6037, 1085.7481, 20.838),
        new mp.Vector3(-1119.4880, 2697.086, 18.5541),
        new mp.Vector3(-1305.45056, -394.0068, 36.695)
      ],
    },
    '7/11': {
      enter: (player) => {
        player.call('displayHelpText',['~INPUT_PICKUP~ para Comprar.']);
        let location = yarp.locations[this.id];
        yarp.hotkeys['Event'].bind(player,['createBrowser', ['menu', ['package://YARP/ui/html/sideMenu.html', 'populateSaleCategories', location.id,JSON.stringify(location.sale)]]]);
      },
      leave: (player) => {
        player.call('clearHelpText');
        player.call('destroyBrowser', ['menu']);
        yarp.hotkeys['Event'].unbind(player);
      },
      visible: false,
      positions: [
        new mp.Vector3(1734.48046875, 6420.38134765625, 34.5372314453125),
        new mp.Vector3(1960.7580566406, 3749.26367187, 31.3437423706055),
        new mp.Vector3(1986.1240234375, 3053.874755859, 47.215171813),
        new mp.Vector3(-709.17022705, -904.21722412109, 19.215591430664),
        new mp.Vector3(28.7538948059082, -1339.8212890625, 29.4970436096191),
        new mp.Vector3(-43.1531448364258, -1748.75244140625, 29.4209976196289),
        new mp.Vector3(378.030487060547, 332.944427490234, 103.566375732422),
        new mp.Vector3(1126.68029785156, -980.39501953125, 45.4157257080078),
        new mp.Vector3(2673.32006835938, 3286.4150390625, 55.241138458252),
        new mp.Vector3(1707.52648925781, 4920.05126953125, 42.0636787414551),
        new mp.Vector3(-1479.22424316406, -375.097686767578, 39.1632804870605),
        new mp.Vector3(-2959.37524414063, 387.556365966797, 14.043158531189),
        new mp.Vector3(-1220.14123535156, -915.712158203125, 11.3261671066284),
        new mp.Vector3(1160.06237792969, -314.061828613281, 69.2050628662109),
        new mp.Vector3(-1829.00427246094, 798.903076171875, 138.186706542969),
        new mp.Vector3(2549.400390625, 385.048309326172, 108.622955322266),
        new mp.Vector3(-621.989135742188, -230.804443359375, 38.0570297241211)
      ],
    },
    // 'FIB Elevator Up': {
    //   enter: (player) => {
    //     player.call('displayHelpText',['Press ~INPUT_PICKUP~ to take the elevator.']);
    //     yarp.hotkeys['Teleport'].bind(player, [yarp.labels['FIB Elevator Down 1'].position]);
    //   },
    //   leave: (player) => {
    //     player.call('clearHelpText');
    //     yarp.hotkeys['Teleport'].unbind(player);
    //   },
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(139.219,-762.7094,45.752)
    //   ],
    // },
    // 'FIB Elevator Down': {
    //   enter: (player) => {
    //     player.call('displayHelpText',['Press ~INPUT_PICKUP~ to take the elevator.']);
    //     yarp.hotkeys['Teleport'].bind(player, [yarp.labels['FIB Elevator Up 1'].position]);
    //   },
    //   leave: (player) => {
    //     player.call('clearHelpText');
    //     yarp.hotkeys['Teleport'].unbind(player);
    //   },
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(136.0667,-761.8372,234.1520)
    //   ],
    // },
    // 'Airport': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-1032.690, -2728.141, 13.757),
    //     new mp.Vector3(1743.6820, 3286.2510, 40.087)
    //   ],
    // },
    // 'Cable Car': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-737.746, 5595.192, 41.655),
    //     new mp.Vector3(457.097, 5571.724, 781.184)
    //   ],
    // },
    // 'Tattoo Shop': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(1322.645, -1651.976, 52.275),
    //     new mp.Vector3(-1153.676, -1425.68, 4.954),
    //     new mp.Vector3(322.139, 180.467, 103.587),
    //     new mp.Vector3(-3170.071, 1075.059, 20.829),
    //     new mp.Vector3(1864.633, 3747.738, 33.032),
    //     new mp.Vector3(-293.713, 6200.04, 31.487)
    //   ],
    // },
    // 'Barbershop': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-827.333, -190.916, 37.599),
    //     new mp.Vector3(130.512, -1715.535, 29.226),
    //     new mp.Vector3(-1291.472, -1117.230, 6.641),
    //     new mp.Vector3(1936.451, 3720.533, 32.638),
    //     new mp.Vector3(1200.214, -468.822, 66.268),
    //     new mp.Vector3(-30.109, -141.693, 57.041),
    //     new mp.Vector3(-285.238, 6236.365, 31.455)
    //   ],
    // },
    // 'Carwash': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(26.5906, -1392.0261, 29.3634),
    //     new mp.Vector3(167.1034, -1719.4704, 29.2916),
    //     new mp.Vector3(-74.5693, 6427.8715, 31.4400),
    //     new mp.Vector3(-699.6325, -932.7043, 19.0139)
    //   ],
    // },
    // 'Clothing': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(88.291, -1391.929, 29.200),
    //     new mp.Vector3(-718.985, -158.059, 36.996),
    //     new mp.Vector3(-151.204, -306.837, 38.724),
    //     new mp.Vector3(414.646, -807.452, 29.33),
    //     new mp.Vector3(-815.193, -1083.333, 11.022),
    //     new mp.Vector3(-1208.098, -782.020, 17.163),
    //     new mp.Vector3(-1457.954, -229.426, 49.185),
    //     new mp.Vector3(-2.777, 6518.491, 31.533),
    //     new mp.Vector3(1681.586, 4820.133, 42.046),
    //     new mp.Vector3(130.216, -202.940, 54.505),
    //     new mp.Vector3(618.701, 2740.564, 41.905),
    //     new mp.Vector3(1199.169, 2694.895, 37.866),
    //     new mp.Vector3(-3164.172, 1063.927, 20.674),
    //     new mp.Vector3(-1091.373, 2702.356, 19.422)
    //   ],
    // },
    // 'Gang Zone': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(298.68, -2010.10, 20.07),
    //     new mp.Vector3(86.64, -1924.60, 20.79),
    //     new mp.Vector3(-183.52, -1632.62, 33.34),
    //     new mp.Vector3(989.37, -1777.56, 31.32),
    //     new mp.Vector3(960.24, -140.31, 74.50),
    //     new mp.Vector3(-1042.29, 4910.17, 94.92),
    //     new mp.Vector3(29.4838, 3735.593, 38.688),
    //     new mp.Vector3(-455.752, -1711.884, 18.642)
    //   ],
    // },
    // 'Gas Station': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(49.41872, 2778.793, 58.04395),
    //     new mp.Vector3(263.8949, 2606.463, 44.98339),
    //     new mp.Vector3(1039.958, 2671.134, 39.55091),
    //     new mp.Vector3(1207.26, 2660.175, 37.89996),
    //     new mp.Vector3(2539.685, 2594.192, 37.94488),
    //     new mp.Vector3(2679.858, 3263.946, 55.24057),
    //     new mp.Vector3(2005.055, 3773.887, 32.40393),
    //     new mp.Vector3(1687.156, 4929.392, 42.07809),
    //     new mp.Vector3(1701.314, 6416.028, 32.76395),
    //     new mp.Vector3(179.8573, 6602.839, 31.86817),
    //     new mp.Vector3(-94.46199, 6419.594, 31.48952),
    //     new mp.Vector3(-2554.996, 2334.402, 33.07803),
    //     new mp.Vector3(-1800.375, 803.6619, 138.6512),
    //     new mp.Vector3(-1437.622, -276.7476, 46.20771),
    //     new mp.Vector3(-2096.243, -320.2867, 13.16857),
    //     new mp.Vector3(-724.6192, -935.1631, 19.21386),
    //     new mp.Vector3(-526.0198, -1211.003, 18.18483),
    //     new mp.Vector3(-70.21484, -1761.792, 29.53402),
    //     new mp.Vector3(265.6484, -1261.309, 29.29294),
    //     new mp.Vector3(819.6538, -1028.846, 26.40342),
    //     new mp.Vector3(1208.951, -1402.567, 35.22419),
    //     new mp.Vector3(1181.381, -330.8471, 69.31651),
    //     new mp.Vector3(620.8434, 269.1009, 103.0895),
    //     new mp.Vector3(2581.321, 362.0393, 108.4688),
    //     new mp.Vector3(1785.363, 3330.372, 41.38188),
    //     new mp.Vector3(-319.690, -1471.610, 30.030),
    //     new mp.Vector3(174.880, -1562.450, 28.740),
    //     new mp.Vector3(1246.480, -1485.450, 34.900),
    //     new mp.Vector3(-66.330, -2532.570, 6.140)
    //   ],
    // },
    // 'Hospital': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(1839.6, 3672.93, 34.28),
    //     new mp.Vector3(-247.76, 6331.23, 32.43),
    //     new mp.Vector3(-449.67, -340.83, 34.50),
    //     new mp.Vector3(357.43, -593.36, 28.79),
    //     new mp.Vector3(295.83, -1446.94, 29.97),
    //     new mp.Vector3(-676.98, 310.68, 83.08),
    //     new mp.Vector3(1151.21, -1529.62, 35.37),
    //     new mp.Vector3(-874.64, -307.71, 39.58)
    //   ],
    // },
    // 'House': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-952.359436, -1077.50219, 2.6772258),
    //     new mp.Vector3(-59.124889373, -616.554, 37.35677),
    //     new mp.Vector3(-255.05390, -943.3288, 31.21998),
    //     new mp.Vector3(-771.7988, 351.594, 87.9981),
    //     new mp.Vector3(-3086.428, 339.252, 6.371),
    //     new mp.Vector3(-917.289, -450.206, 39.600),
    //     new mp.Vector3(261.4586, -998.8196, -99.00863),
    //     new mp.Vector3(-35.31277, -580.4199, 88.71221),
    //     new mp.Vector3(120.5, 549.952, 184.097),
    //     new mp.Vector3(-1288.055, 440.748, 97.69459),
    //     new mp.Vector3(-1468.14, -541.815, 73.4442)
    //   ],
    // },
    // 'LS Customs': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-337.3863, -136.9247, 39.0737),
    //     new mp.Vector3(-1155.536, -2007.183, 13.244),
    //     new mp.Vector3(731.8163, -1088.822, 22.233),
    //     new mp.Vector3(1175.04, 2640.216, 37.82177),
    //     new mp.Vector3(110.8406, 6626.568, 32.287)
    //   ],
    // },
    // 'Race': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-1277.629, -2030.913, 1.2823),
    //     new mp.Vector3(2384.969, 4277.583, 30.379),
    //     new mp.Vector3(1577.881, 3836.107, 30.7717)
    //   ],
    // },
    // 'Police Station': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(425.130, -979.558, 30.711),
    //     new mp.Vector3(1859.234, 3678.742, 33.690),
    //     new mp.Vector3(-438.862, 6020.768, 31.490),
    //     new mp.Vector3(818.221, -1289.883, 26.300)
    //   ],
    // },
    // 'Smoke on the Water': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-1171.42, -1572.72, 3.6636)
    //   ],
    // },
    // 'MazeBank Arena': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-250.604, -2030.000, 30.000)
    //   ],
    // },
    // 'Bahama Mamas': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(925.329, 46.152, 80.908)
    //   ],
    // },
    // 'Downtown CO.': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(900.461, -181.466, 73.89)
    //   ],
    // },
    // 'Tequil-La La': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-565.171, 276.625, 83.286)
    //   ],
    // },
    // 'Theater': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-455.752, 180.466, 104.301)
    //   ],
    // },
    // 'Weed Farm': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(2208.777, 5578.235, 53.735)
    //   ],
    // },
    // 'FIB': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(105.455, -745.483, 44.754)
    //   ],
    // },
    // 'Lifeinvader': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-1047.900, -233.000, 39.000)
    //   ],
    // },
    // 'Cluckin Bell': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-72.68752, 6253.72656, 31.08991)
    //   ],
    // },
    // 'Comedy Club': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-447.4833, 280.3197, 77.5215)
    //   ],
    // },
    // 'Yacht': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-2045.800, -1031.200, 11.900)
    //   ],
    // },
    // 'Ranch': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(2441.200, 4968.500, 51.700)
    //   ],
    // },
    // 'PlayBoy': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-1475.234, 167.088, 55.841)
    //   ],
    // },
    // 'Chop Shop': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(479.056, -1316.825, 28.203)
    //   ],
    // },
    // 'Rebel Radio': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(736.153, 2583.143, 79.634)
    //   ],
    // },
    // 'Morgue': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(243.351, -1376.014, 39.534)
    //   ],
    // },
    // 'Golf': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-1336.715, 59.051, 55.246)
    //   ],
    // },
    // 'Hippie Camp': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(2476.712, 3789.645, 41.226)
    //   ],
    // },
    // 'Torture': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(132.583, -2202.327, 7.187)
    //   ],
    // },
    // 'Body Training': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-1202.962, -1566.140, 4.610)
    //   ],
    // },
    // 'Lester': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(1274.292, -1712.663, 54.771),
    //     new mp.Vector3(705.859, -964.651, 30.396)
    //   ],
    // },
    // 'Epsilon': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(245.1564, 370.211, 104.7382)
    //   ],
    // },
    // 'Franklin': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(7.900, 548.100, 175.500),
    //     new mp.Vector3(-14.128, -1445.483, 30.648)
    //   ],
    // },
    // 'Michael': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(-852.400, 160.000, 65.600)
    //   ],
    // },
    // 'Trevor': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(1985.700, 3812.200, 32.200),
    //     new mp.Vector3(-1159.034, -1521.180, 10.633)
    //   ],
    // },
    // 'Ilegal Jobs': {
    //   visible: false,
    //   positions: [
    //     new mp.Vector3(707.324, -966.986, 30.412)
    //   ],
    // }
};

module.exports = Object.assign({}, config, realEstateConfig);