'use strict';

let config = {
    'superadmin': {
        'code': {
            hint: 'Write code to be executed from inside the game. A very powerful command.',
            permissions: ['cmd.code'],
            call: (player, args) => {
                player.call('createBrowser', ['editor', ['package://YARP/ui/html/editor.html', 'setupCodeEditor']]);
                yarp.hotkeys['ToggleChat'].bind(player);
            }
        },
        'new': {
            hint: 'Create any gamemode object from inside the game. A very powerful command.',
            permissions: ['cmd.new'],
            call: (player, args) => {
                args = yarp.utils.getSubstrings(args.join(' '), '\'');
                let Class = args[0];
                if (Class) {
                    args.splice(0, 1);
                    if (args.length > 0) {
                        for (let i = 0; i < args.length; i++) {
                            try {
                                let arg = eval(args[i]);
                            } catch (err) {
                                args[i] = `'${args[i]}'`
                            }
                        }
                        eval(`new yarp[Class](${args.join(', ')})`)
                    } else {
                        player.call('createBrowser', ['editor', ['package://YARP/ui/html/editor.html', 'setupCodeEditor', `new yarp.${Class}(${yarp.utils.getParamNames(yarp[Class]).join(', ')})`]]);
                        yarp.hotkeys['ToggleChat'].bind(player);
                    }
                }
            }
        },
        'rem': {
            hint: 'Remove any gamemode object from inside the game. A very powerful command.',
            permissions: ['cmd.rem'],
            call: (player, args) => {
                args = yarp.utils.getSubstrings(args.join(' '), '\'');
                let Class = args[0];
                let id = args[1];
                if (yarp[Class]) {
                    let obj = yarp[Class.toLowerCase() + 's'][id];
                    if (obj) {
                        obj.remove();
                    }
                }
            }
        },
        'edit': {
            hint: 'Edit any gamemode object from inside the game. A very powerful command.',
            permissions: ['cmd.edit'],
            call: (player, args) => {
                args = yarp.utils.getSubstrings(args.join(' '), '\'');
                let Class = args[0];
                let id = args[1];
                if (yarp[Class]) {
                    let collection = Class.toLowerCase() + 's';
                    let obj = yarp[collection][id];
                    if (obj) {
                        if (args.length > 2) {
                            let text = '';
                            for (let i = 2; i < args.length; i++) {
                                text = text + `yarp.${collection}['${id}'].${args[i]} = ${obj[args[i]]};\\n`;
                            }
                            player.call('createBrowser', ['editor', ['package://YARP/ui/html/editor.html', 'setupCodeEditor', text]]);
                            yarp.hotkeys['ToggleChat'].bind(player);
                        } else {
                            player.call('createBrowser', ['editor', ['package://YARP/ui/html/editor.html', 'setupCodeEditor', `yarp.${collection}['${id}'];`]]);
                            yarp.hotkeys['ToggleChat'].bind(player);
                        }
                    }
                }
            }
        },
        'givegroup': {
            hint: 'Give a group to an user or character.',
            permissions: ['cmd.givegroup'],
            call: (player, args) => {
                args = yarp.utils.getSubstrings(args.join(' '), '\'');
                console.log(args);
                let user = yarp.users[args[0]];
                let character = yarp.characters[args[0]];
                let group = yarp.groups[args[1]];
                if (group) {
                    if (user) {
                        user.giveGroup(group.id);
                        user.save();
                    } else if (character) {
                        character.giveGroup(group.id);
                        character.save();
                    }
                }
            }
        },
        'takegroup': {
            hint: 'Take a group from an user or character.',
            permissions: ['cmd.takegroup'],
            call: (player, args) => {
                args = yarp.utils.getSubstrings(args.join(' '), '\'');
                let user = yarp.users[args[0]];
                let character = yarp.characters[args[0]]
                let group = yarp.groups[args[1]];
                if (group) {
                    if (user) {
                        user.takeGroup(group.id);
                        user.save();
                    } else if (character) {
                        character.takeGroup(group.id);
                        character.save();
                    }
                }
            }
        },
        'givejob': {
            hint: 'Give a job to a character.',
            permissions: ['cmd.givejob'],
            call: (player, args) => {
                //
            }
        },
        'takejob': {
            hint: 'Take a group from a character.',
            permissions: ['cmd.takejob'],
            call: (player, args) => {
                //
            }
        }
    },
    'admin': {
        'tick': {
            hint: 'Show the server tick.',
            permissions: ['cmd.tick'],
            call: (player, args) => {
                player.outputChatBox(`Tick: ${yarp.tick}`);
            }
        },
        'kill': {
            hint: 'Kill yourself.',
            permissions: ['cmd.kill'],
            call: (player, args) => {
                player.health = 0;
            }
        },
        'givemoney': {
            hint: 'Give yourself money.',
            permissions: ['cmd.givemoney'],
            call: (player, args) => {
                yarp.characters[player.name].giveMoney(Number(args[0]));
                player.notify('Received ~g~$' + args[0])
            }
        },
        'hp': {
            hint: 'Regenerates player health.',
            permissions: ['cmd.hp'],
            call: (player, args) => {
                player.health = 100;
            }
        },
        'armour': {
            hint: 'Regenerates player armour.',
            permissions: ['cmd.armour'],
            call: (player, args) => {
                player.armour = 100;
            }
        },
        'weapon': {
            hint: 'Gives specified weapon and ammo.',
            permissions: ['cmd.weapon'],
            call: (player, args) => {
                let ammo = Number(args[1]) || 10000;
                let id = 'weapon_' + args[0]
                yarp.characters[player.name].giveWeapon(yarp.weapons[id.toUpperCase()], ammo);
                yarp.characters[player.name].save();
            }
        },
        'yveh': {
            hint: 'Spawns specified vehicle model.',
            permissions: ['cmd.veh'],
            call: (player, args) => {
                let veh = new yarp.Vehicle({
                    id: "teste",
                    model: args[0],
                    position: player.position,
                    heading: player.heading,
                    plate: "Testando123",
                    fuel: 100
                });               

                // let veh = mp.vehicles.new(mp.joaat(args[0]), player.position,
                //     {
                //         heading: player.heading
                //     });
                player.putIntoVehicle(veh, -1);
            }
        },
        'noclip': {
            hint: 'Toggle No-clip.',
            permissions: ['cmd.noclip'],
            call: (player, args) => {
                player.call('toggleNoclip')
            }
        },
        'charpos': {
            hint: 'Toggle character position display.',
            permissions: ['cmd.charpos'],
            call: (player, args) => {
                player.call('toggleCharpos')
            }
        },
        'camdir': {
            hint: 'Toggle camera direction display.',
            permissions: ['cmd.camdir'],
            call: (player, args) => {
                player.call('toggleCamdir')
            }
        },
        'gmtp': {
            hint: 'Teleport to specified gamemode object.',
            permissions: ['cmd.gmtp'],
            call: (player, args) => {
                args = yarp.utils.getSubstrings(args.join(' '), '\'');
                let Class = args[0];
                let id = args[1];
                if (yarp[Class]) {
                    let collection = Class.toLowerCase() + 's';
                    let obj = yarp[collection][id];
                    player.position = obj.position;
                }
            }
        },
        'tp': {
            hint: 'Teleport to specified position.',
            permissions: ['cmd.tp'],
            call: (player, args) => {
                //Sanitize arguments
                args[0] = args[0].replace(/,/g, '').replace(/}/g, '');
                args[1] = args[1].replace(/,/g, '').replace(/}/g, '');
                args[2] = args[2].replace(/,/g, '').replace(/}/g, '');
                player.position = new mp.Vector3(Number(args[0]), Number(args[1]), Number(args[2]));
            }
        }
    },
    'user': {
        'inventory': {
            hint: 'Open your inventory.',
            permissions: ['cmd.inventory'],
            call: (player, args) => {
                let list = [];
                let inventory = yarp.characters[player.name].inventory;
                for (let id in inventory) {
                    let item = yarp.items[id];
                    list.push({
                        id: item.id,
                        model: item.model,
                        amount: inventory[id],
                        options: item._options
                    });
                }
                player.call('createBrowser', ['inventory', ['package://YARP/ui/html/inventory.html', 'populateInventory', JSON.stringify(list), "Inventory"]]);
            }
        },
        'money': {
            hint: 'Write your location + commentary on jpos.log.',
            permissions: ['cmd.money'],
            call: (player, args) => {
                player.outputChatBox(`Wallet: !{51, 204, 51}${yarp.characters[player.name].wallet}`);
                player.outputChatBox(`Bank: !{0, 153, 255}${yarp.characters[player.name].bank}`);
            }
        },
        'groups': {
            hint: 'Nomes de grupos do servidor.',
            permissions: ['cmd.groups'],
            call: (player, args) => {
                var keys = Object.keys(yarp.groups);
                var blacklist = ['_Class'];
                var listGroup = keys.filter(k => blacklist.indexOf(k) == -1);
                var displayString = listGroup.join(', ');
                player.outputChatBox(`${displayString}`);
            }
        },
        '?': {
            hint: 'Lists existing commands for each category.',
            permissions: ['cmd.hint'],
            call: (player, args) => {
                if (!args[0]) {
                    player.outputChatBox(`!{yellow}HINT!{white}: ${Object.keys(yarp.commands.categories).join(', ')}`);
                } else {
                    let category = yarp.commands.categories[args[0]];
                    if (category) {
                        player.outputChatBox(`!{yellow}HINT!{white}: ${Object.keys(category).join(', ')}`);
                    } else {
                        let command = yarp.commands[args[0]];
                        if (command) {
                            player.outputChatBox(`!{yellow}HINT!{white}: ${command.hint}`);
                        }
                    }
                }
            }
        },

        // COMANDOS QUE DEPOIS PRECISAM VIRAR VISUAIS
        'quitjob': {
            hint: 'Sair do emprego atual',
            permissions: ['cmd.quitjob'],
            call: (player) => {
               const character = yarp.characters[player.name]; 
               const jobs = character.jobs;
    
               if (jobs.length === 0) { 
                  player.outputChatBox(`!{yellow}Vagabundo! !{white} Você é um desempregado, não tem trabalho para desistir.`); 
               } else {
                  // Remove all jobs
                  for (let i = 0; i < jobs.length; i++) {
                     const jobStr = jobs[i];
                     const jobInfo = yarp.jobs[jobs[i]];
                     character.takeJob(jobs[i]);
                     player.outputChatBox(`!{yellow}Você deixou seu cargo de: !{white} ${jobInfo.label}`);
                  }
                  character.save();
               }
            }
        },
        'calltaxi': {
            hint: 'Chamar Taxi',
            permissions: ['cmd.calltaxi'],
            call: (player) => {
                const res = yarp.jobRequest.request(player, 'Taxista');
                if (!res) {
                    const currentChar = yarp.characters[player.name];
                    currentChar.notifyWithPicture("Ops!", "Downtown Cab Co.", "Não temos nenhum motorista disponível no momento.", "CHAR_TAXI");
                }
            }
        },
        'callcops': {
            hint: 'Chamar Taxi',
            permissions: ['cmd.callcops'],
            call: (player) => {
                const res = yarp.jobRequest.request(player, 'Policial');
                if (!res) {
                    const currentChar = yarp.characters[player.name];
                    currentChar.notifyWithPicture("Ops!", "Downtown Cab Co.", "Não temos nenhum motorista disponível no momento.", "CHAR_TAXI");
                }
            }
        },
        'syncpos': {
            hint: 'Sync Posição',
            permissions: ['cmd.syncpos'],
            call: (player) => {                
                
            }
        },
        // 'testm': {
        //     hint: 'Testar Mensagem',
        //     permissions: ['cmd.testm'],
        //     call: (player) => {                
                
        //     }

        // },
        // 'notification': {
        //     hint: 'Test',
        //     permissions: [],
        //     call: (player, args) => {
        //         player.call('deftBackgroundBrowserExecute', ['notifications/ADD_NOTIFICATION', {
        //             id: 32,
        //             message: 'Pedido de taxi',
        //             acceptEnabled: true,
        //             refuseEnabled: true,
        //             timer: 0,
        //         }]);
        //     }
        // },
    }
    
}


module.exports = config;