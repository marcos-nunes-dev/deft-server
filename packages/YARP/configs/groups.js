'use strict';

let config = {
  'Super Admin': {
    permissions: [
      'cmd.code',
      'cmd.edit',
      'cmd.new',
      'cmd.rem',
      'cmd.givegroup',
      'cmd.takegroup',
      'cmd.kill',
      'cmd.givemoney',
      'cmd.hp',
      'cmd.armour',
      'cmd.weapon',
      'cmd.veh',
      'cmd.charpos',
      'cmd.camdir',
      'cmd.noclip',
      'cmd.tp',
      'cmd.givejob',
      'cmd.takejob',
      'cmd.gmtp'

    ],
    enter: (player) => {player.notify('Bem-vindo(a), Super Admin.');},
    //leave: (player) => {console.log('A superadmin left.');}
  },
  'Admin': {
    permissions: [
      'cmd.kill',
      'cmd.givemoney',
      'cmd.hp',
      'cmd.armour',
      'cmd.weapon',
      'cmd.veh',
      'cmd.charpos',
      'cmd.camdir',
      'cmd.noclip',
      'cmd.tp',
      'cmd.gmtp'
    ]
  },
  'User': {
    permissions: [
      'cmd.inventory',
      'cmd.money',
      'cmd.hint',
      'cmd.savepos',
      'cmd.groups',
      'cmd.quitjob',
      'cmd.calltaxi',
      'cmd.callcops',
      'cmd.syncpos'
    ]
  },
}

module.exports = config;
