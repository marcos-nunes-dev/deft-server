'use strict';
/**
 * Creates a Character.
 * @namespace yarp.Character
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Character name.
 * @param {Vector3} socialClub - User social club.
 * @param {number} [age=18] - Character age.
 * @param {object} [face={}] - Character face.
 * @param {string} [lastLogin=''] - Character last login.
 * @param {Float} [wallet=yarp.variables['Starting Wallet'].value] - Character wallet.
 * @param {Float}  [bank=yarp.variables['Starting Bank'].value] - Character bank.
 * @param {Float} [health=100] - Character health.
 * @param {Float} [armour=0] - Character armour.
 * @param {Float} [hunger=0] - Character hunger.
 * @param {Float} [thirst=0] - Character thirst.
 * @param {Vector3} [position=yarp.variables['First Spawn'].value] - Character position.
 * @param {number} [heading=yarp.variables['First Heading'].value] - Character heading.
 * @param {Array<string>} [groups=[]] - Character groups.
 * @param {Array<string>} [jobs=[]] - Character jobs.
 * @param {object} [weapons={}] - Character weapons.
 * @param {object} [skills={}] - Character skills.
 * @param {Float} [weight=0] - Character weight.
 * @param {object} [inventory={}] - Character inventory.
 * @param {object} [customization={}] - Character customization.
 * @param {object} [decoration={}] - Character decoration.
 * @param {object} [clothes={}] - Character clothes.
 * @param {function} [enter=() => {}] - Character enter function.
 * @param {function} [leave=() => {}] - Character leave function.
 */

class Character extends yarp.GMObject{
  constructor(id,socialClub,age,model,face,lastLogin,wallet,bank,dirtyMoney,health,armour,hunger,thirst,xp,cnh,position,heading,groups,jobs,weapons,skills,weight,inventory,customization,decoration,clothes,defaultClothes,enter,leave){
    super();
    if ((id && socialClub) != null){
      this._id = id;
      this._socialClub = socialClub;
      this._age = age || 18;
      this._model = model || 'mp_m_freemode_01';
      this._face = face || {};
      this._lastLogin = lastLogin || '';
      this._wallet = this._lastLogin ? wallet : yarp.variables['Starting Wallet'].value;
      this._bank = this._lastLogin ? bank : yarp.variables['Starting Bank'].value;
      this._dirtyMoney = dirtyMoney || 0;
      this._health = health || 100;
      this._armour = armour || 0;
      this._position = this._lastLogin ? position : yarp.variables['First Spawn'].value;
      this._heading = this._lastLogin ? heading : yarp.variables['First Heading'].value;
      this._groups = groups || ['User'];
      this._jobs = jobs || [];
      this._weapons = weapons || {};
      this._skills = skills || {};
      this._weight = weight || 0;
      this._hunger = hunger || 0;
      this._thirst = thirst || 0;
      this._xp = xp || 0;
      this._cnh = cnh || false;
      this._inventory = inventory || {};
      this._customization = customization || {};
      this._decoration = decoration || {};
      this._clothes = clothes || {};
      this._defaultClothes = defaultClothes || {};
      this._enter = ((enter) ? enter.toString() : '() => {}');
      this._leave = ((leave) ? leave.toString() : '() => {}');
      this.players = [];
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Get character player.
   * @instance
   * @function player
   * @memberof yarp.Character
   * @returns {object} - Player.
   */
  get player(){
    for (let player of mp.players.toArray()) {
      if (player.name == this.id){
        return player;
      }
    }
    return null;
  }

  /**
   * Get character user.
   * @instance
   * @function user
   * @memberof yarp.Character
   * @returns {object} - User.
   */
  get user(){
    return yarp.users[this.socialClub];
  }

  /**
   * Get character balance.
   * @instance
   * @function balance
   * @memberof yarp.Character
   * @returns {Array<object>} - Balance.
   */
  get balance(){
    let balance = [];
    for (transaction of yarp.transactions.toArray()) {
      if ((transaction.source || transaction.target) == this.id) {
        balance.push(transaction);
      }
    }
    return balance;
  }

  /**
   * Call enter fuction for character and it's groups.
   * @instance
   * @function enter
   * @memberof yarp.Character
   * @returns {function} - Enter functions.
   * @fires characterJoinedGroup
   */
  get enter() {
    return () => {
      let player = this.player;
      if (this._enter) {
        (eval(this._enter))(player)
      }
      for (let group of this.groups){
        yarp.groups[group].enter(player);
        mp.events.call('characterJoinedGroup',player,this,group);
      }
    }
  }

  /**
   * Call leave fuction for character and it's groups.
   * @instance
   * @function leave
   * @memberof yarp.Character
   * @returns {function} - Leave functions.
   * @fires characterLeftGroup
   */
  get leave() {
    return () => {
      let player = this.player;
      if (this._leave) {
        (eval(this._leave))(player)
      }
      for (let group of this.groups){
        yarp.groups[group].leave(player);
        mp.events.call('characterLeftGroup',player,this,group);
      }
    }
  }

  set enter(value) {
    this._enter = value;
  }

  set leave(value) {
    this._leave = value;
  }

  /*
  * Set Player Clothes
  */
  setClothes(p1, p2, p3, p4){
    this.player.setClothes(p1, p2, p3, p4);
  }

   /*
  * save Player Clothes
  */
  saveClothes(){
    const clothes = [];
    for (var i = 12 - 1; i >= 0; i--) {
      clothes[i] = this.player.getClothes(i);
    }
    const char = yarp.characters[this.player.name];
    char.clothes = clothes;
    char.save();
  }

    /*
  * save Player Clothes as Default
  */
  saveClothesAsDefault(){
    const clothesDefault = [];
    for (var i = 12 - 1; i >= 0; i--) {
      clothesDefault[i] = this.player.getClothes(i);
    }
    const char = yarp.characters[this.player.name];
    char.defaultClothes = clothesDefault;
    char.save();
  }

  /*
  * Reset all player clothes
  */
  clearClothes(){
    this.player.setClothes(1,0,0,0);
    this.player.setClothes(3,0,0,0);
    this.player.setClothes(4,0,0,0);
    this.player.setClothes(5,0,0,0);
    this.player.setClothes(6,0,0,0);
    this.player.setClothes(7,0,0,0);
    this.player.setClothes(8,0,0,0);
    this.player.setClothes(9,0,0,0);
    this.player.setClothes(10,0,0,0);
    this.player.setClothes(11,0,0,0);
  }
 
  /*
  * Notify Player with just text
  */
  notifyWithText(message, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]){
    this.player.call("BN_Show", [message, flashing, textColor, bgColor, flashColor]);
  }

  /*
  * Notify Player with nice look
  */
  notifyWithPicture(title, sender, message, notifPic, icon = 0, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]){
    this.player.call("BN_ShowWithPicture", [title, sender, message, notifPic, icon, flashing, textColor, bgColor, flashColor]);
  }

  /*
  * Notify player with a notification using deft notification CEF
  */
  notifyWithDeft(id, message, group, yesText, noText, timer, data) {
    this.player.call('deftBackgroundBrowserExecute', ['notifications/ADD_NOTIFICATION', {
      id,
      message,
      group,
      yesText,
      noText,
      timer,
      data,
    }]);
  }

  /*
  * Clear notifications group
  */
  clearDeftNotificationsGroup(group) {
    this.player.call('deftBackgroundBrowserExecute', ['notifications/CLEAR_NOTIFICATIONS_GROUP', { group }]);
  }

  /*
  * Remove Player Job Request
  */
  removeJobRequest(id) {
    this.player.call('deftBackgroundBrowserExecute', ['notifications/REMOVE_NOTIFICATION', { id }]);
  }

  /*
  * Function to await response to accept or reject request notifications
  */
  waitResponse(typeOfCall, character){
    yarp.utils.manageResponse("insert", typeOfCall, character);
  }

  /**
   * Update character last login.
   * @instance
   * @function updateLastLogin
   * @memberof yarp.Character
   * @param {string} ip - Character ip.
   */
  updateLastLogin(ip){
    this.lastLogin = `${ip} ${yarp.utils.getTimestamp(new Date())}`;
  }

  /**
   * Give money.
   * @instance
   * @function giveMoney
   * @memberof yarp.Character
   * @param {number} value - Amount to give.
   */
  giveMoney(value){
    this.wallet += value;
    this.player.setVariable('PLAYER_WALLET', this.wallet);
  }

    /**
   * Give money.
   * @instance
   * @function giveMoney
   * @memberof yarp.Character
   * @param {number} value - Amount to give.
   */
  giveMoneyBank(value){
    this.bank += value;
    this.player.setVariable('PLAYER_BANK', this.bank);
  }

  /**
   * Try take money
   * @instance
   * @function tryWalletPayment
   * @memberof yarp.Character
   * @param {number} value - Amount to pay.
   * @returns {boolean} - Operation success/fail.
   */
  takeMoney(value){
    if (this.wallet-value >= 0){
      this.wallet -= value;
      this.player.setVariable('PLAYER_WALLET', this.wallet);
      return true;
    }
    return false;
  }

  /**
   * Give Dirty money.
   * @instance
   * @function giveDirtyMoney
   * @memberof yarp.Character
   * @param {number} value - Amount to give.
   */
  giveDirtyMoney(value){
    this.dirtyMoney += value;
    this.player.setVariable('PLAYER_DIRTYMONEY', this.dirtyMoney);
  }

  /**
   * Try take Dirty money
   * @instance
   * @function takeDirtyMoney
   * @memberof yarp.Character
   * @param {number} value - Amount to pay.
   * @returns {boolean} - Operation success/fail.
   */
  takeDirtyMoney(value){
    if (this.dirtyMoney-value >= 0){
      this.dirtyMoney -= value;
      this.player.setVariable('PLAYER_DIRTYMONEY', this.dirtyMoney);
      return true;
    }
    return false;
  }

  /**
   * Try wallet payment.
   * @instance
   * @function tryWalletPayment
   * @memberof yarp.Character
   * @param {number} value - Amount to pay.
   * @returns {boolean} - Operation success/fail.
   */
  tryWalletPayment(value){
    if (this.wallet-value >= 0){
      this.wallet -= value;
      this.player.setVariable('PLAYER_WALLET', this.wallet);
      return true;
    }
    return false;
  }

  /**
   * Try bank payment.
   * @instance
   * @function tryBankPayment
   * @memberof yarp.Character
   * @param {number} value - Amount to pay.
   * @returns {boolean} - Operation success/fail.
   */
  tryBankPayment(value){
    if (this.bank-value >= 0){
      // let transaction = new Transaction('Payment',value,this.name);
      // transaction.save();
      this.bank -= value;
      this.player.setVariable('PLAYER_BANK', this.bank);
      return true;
    }
    return false;
  }

  /**
   * Try full payment.
   * @instance
   * @function tryFullPayment
   * @memberof yarp.Character
   * @param {number} value - Amount to pay.
   * @returns {boolean} - Operation success/fail.
   */
  tryFullPayment(value){
    if (this.wallet-value >= 0){
      this.wallet -= value;
      this.player.setVariable('PLAYER_WALLET', this.wallet);
      return true;
    } else {
      if (this.tryWithdraw(value-this.wallet)) {
        this.tryFullPayment(value);
      }
    }
    return false;
  }

  /**
   * Try deposit.
   * @instance
   * @function tryDeposit
   * @memberof yarp.Character
   * @param {number} value - Amount to deposit.
   * @returns {boolean} - Operation success/fail.
   */
  tryDeposit(value){
    if (this.wallet-value >= 0){
      let transaction = new yarp.Transaction('Deposit',value,this.name);
      this.wallet -= value;
      this.bank += value;
      transaction.save();
      this.player.setVariable('PLAYER_WALLET', this.wallet);
      this.player.setVariable('PLAYER_BANK', this.bank);
      return true;
    }
    return false;
  }

  /**
   * Try withdraw.
   * @instance
   * @function tryWithdraw
   * @memberof yarp.Character
   * @param {number} value - Amount to withdraw.
   * @returns {boolean} - Operation success/fail.
   */
  tryWithdraw(value){
    if (this.bank-value >= 0){
      let transaction = new yarp.Transaction('Withdraw',value,this.name);
      this.wallet += value;
      this.bank -= value;
      transaction.save();
      this.player.setVariable('PLAYER_WALLET', this.wallet);
      this.player.setVariable('PLAYER_BANK', this.bank);
      return true;
    }
    return false;
  }

  /**
   * Try transfer.
   * @instance
   * @function tryTransfer
   * @memberof yarp.Character
   * @param {string} target - Target character name.
   * @param {number} value - Amount to transfer.
   * @returns {boolean} - Operation success/fail.
   */
  tryTransfer(target, value){
    if (this.bank-value >= 0){
      let transaction = new yarp.Transaction('Transfer',value,this.name);
      this.bank = this.bank-value;
      target.bank = target.bank+value;
      transaction.save();
      this.player.setVariable('PLAYER_BANK', this.bank);
      target.player.setVariable('PLAYER_BANK', target.bank);
      return true;
    }
    return false;
  }

  /**
   * Give an item.
   * @instance
   * @function giveItem
   * @memberof yarp.Character
   * @param {object} item - Item to give.
   * @param {number} value - Amount to give.
   * @returns {boolean} - Operation success/fail.
   */
  giveItem(item, amount){
    if ((typeof item) === 'string') item = yarp.items[item];
    if (this.weight + item.weight < yarp.variables['Max Weight'].value){
      if (this.inventory[item.id] != null){
        this.inventory[item.id] = this.inventory[item.id] + amount;
      } else {
        this.inventory[item.id] = amount;
      }
      this.weight = yarp.utils.round(this.weight + (amount*item.weight),1);
      return true;
    }
    return false;
  }

  /**
   * Take an item.
   * @instance
   * @function takeItem
   * @memberof yarp.Character
   * @param {object} item - Item to take.
   * @param {number} value - Amount to take.
   * @returns {boolean} - Operation success/fail.
   */
  takeItem(item, amount){
    if ((typeof item) === 'string') item = yarp.items[item];
    if (this.inventory[item.id] != null){
      if (this.inventory[item.id] - amount >= 0){
        this.inventory[item.id] = this.inventory[item.id] - amount;
        this.weight = yarp.utils.round(this.weight - (amount*item.weight),1);
        if (this.inventory[item.id] <= 0) {
          delete this.inventory[item.id];
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Check if has an item.
   * @instance
   * @function takeItem
   * @memberof yarp.Character
   * @param {string} id - Item id.
   * @returns {boolean} - If has or not the item.
   */
  hasItem(id){
    return (this.inventory[id] != null && this.inventory[id] > 0)
  }

  /**
   * Check if has all items.
   * @instance
   * @function hasItems
   * @memberof yarp.Character
   * @param {Array<string>} items - Items id.
   * @returns {boolean} - If has or not all items.
   */
  hasItems(items){
    for (let i = 0; i < items.length; i++){
      if (!this.hasItems(items[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Give a weapon.
   * @instance
   * @function giveWeapon
   * @memberof yarp.Character
   * @param {object} weapon - Weapon object or id.
   * @param {number} amount - Amount of bullets.
   * @fires equipWeapon
   */
  giveWeapon(weapon, amount){
    if ((typeof weapon) === 'string') weapon = yarp.weapons[weapon];
    if (!this.hasWeapon(weapon.id)) {
      this.weapons[weapon.id] = 0;
    }
    if (!amount) amount = 0;
    this.weapons[weapon.id] += amount;
    this.player.giveWeapon(mp.joaat(weapon.id), amount);
    this.player.call('equipWeapon', [JSON.stringify(weapon)]);
  }

  /**
   * Take a weapon.
   * @instance
   * @function takeWeapon
   * @memberof yarp.Character
   * @param {object} weapon - Weapon object or id.
   * @fires unequipWeapon
   */
  takeWeapon(weapon){
    if ((typeof weapon) === 'string') weapon = yarp.weapons[weapon];
    if (this.hasWeapon(weapon.id)) {
      this.weapons.splice(this.weapons.indexOf(weapon.id),1);
    } 
    let player = this.player;
    player.call('takeWeapon', [weapon.id]);
    player.call('unequipWeapon', [JSON.stringify(weapon)]);
  }

  /**
   * Take weapon ammo.
   * @instance
   * @function takeWeaponAmmo
   * @memberof yarp.Character
   * @param {string} id - Weapon id.
   * @param {number} amount - Amount of bullets.
   */
  takeWeaponAmmo(id, amount){
    if (this.hasWeapon(id)) {
      this.weapons[id] -= amount;
      if (this.weapons[id] <= 0) {
        this.weapons[id] = 0;
      }
      let player = this.player;
      player.call('setWeaponAmmo', [id, this.weapons[id]]);
    }
  }

  /**
   * Give weapon ammo.
   * @instance
   * @function giveWeaponAmmo
   * @memberof yarp.Character
   * @param {string} id - Weapon id.
   * @param {number} amount - Amount of bullets.
   */
  giveWeaponAmmo(id, amount){
    if (this.hasWeapon(id)) {
      this.weapons[id] += amount;
      let player = this.player;
      player.call('setWeaponAmmo', [id, this.weapons[id]]);
      player.invoke('0xF28A81E331A3F337', player, mp.joaat(id), this.weapons[id]);
    }
  }


  //return the ammount of bullets
  getWeaponAmmo(id){
    if (this.hasWeapon(id)) {
      let amount = this.weapons[id];
      return amount;
    }
  }

  /**
   * Take ammo.
   * @instance
   * @function takeAmmo
   * @memberof yarp.Character
   * @param {string} id - Ammo id.
   * @param {number} amount - Amount of bullets.
   */
  takeAmmo(id, amount){
    let weaponId = id.replace('AMMO_','WEAPON_');
    if (this.hasWeapon(weaponId)) {
      this.weapons[weaponId] -= amount;
      if (this.weapons[weaponId] <= 0) {
        this.weapons[weaponId] = 0;
      }
      let player = this.player;
      player.call('setWeaponAmmo', [weaponId, this.weapons[weaponId]]);
    }
  }

  /**
   * Give ammo.
   * @instance
   * @function giveAmmo
   * @memberof yarp.Character
   * @param {string} id - Ammo id.
   * @param {number} amount - Amount of bullets.
   */
  giveAmmo(id, amount){
    let weaponId = id.replace('AMMO_','WEAPON_');
    if (this.hasWeapon(weaponId)) {
      this.weapons[weaponId] += amount;
      let player = this.player;
      player.call('setWeaponAmmo', [weaponId, this.weapons[weaponId]]);
    }
  }

  /**
   * Check if has a weapon.
   * @instance
   * @function hasWeapon
   * @memberof yarp.Character
   * @param {string} id - Weapon id.
   * @returns {boolean} - If has or not the weapon.
   */
  hasWeapon(id){
    return (this.weapons[id] != null)
  }

  /**
   * Check if has all weapons.
   * @instance
   * @function hasWeapons
   * @memberof yarp.Character
   * @param {Array<string>} weapons - Weapons id.
   * @returns {boolean} - If has or not all the weapons.
   */
  hasWeapons(weapons){
    for (let i = 0; i < weapons.length; i++){
      if (!this.hasWeapon(weapons[i])) {
        return false;
      }
    }
    return true;
  }

  /*
  * Check if player has weapons and return weapons that player have
  */
  hasAnyWeapon(){
    const poolWeapons = yarp.weapons.toArray();
    const weaponsFinded = [];
    for (let i = 0; i < poolWeapons.length; i++){
      if (this.hasWeapon(poolWeapons[i].id)) {
        weaponsFinded.push(poolWeapons[i].name); 
      }
    }
    return weaponsFinded;
  }


  /**
   * Give a group.
   * @instance
   * @function giveGroup
   * @memberof yarp.Character
   * @param {string} group - Group id.
   * @returns {boolean} - Operation success/fail.
   * @fires characterJoinedGroup
   */
  giveGroup(group){
    if (this.groups.indexOf(group) == -1) {
      if (yarp.groups[group]) {
        let type = yarp.groups[group].type;
        if (type){
          let same_type = this.getGroupByType(type);
          if (same_type){
            this.takeGroup(same_type);
          }
        }
        let player = this.player;
        if (player) {
          yarp.groups[group].enter(player);
          mp.events.call('characterJoinedGroup',player,this,group);
        }
      }
      this.groups.push(group);
      return true;
    }
    return false;
  }

  /**
   * Take a group.
   * @instance
   * @function takeGroup
   * @memberof yarp.Character
   * @param {string} group - Group id.
   * @returns {boolean} - Operation success/fail.
   * @fires characterLeftGroup
   */
  takeGroup(group){
    if (this.groups.indexOf(group) > -1) {
      if (yarp.groups[group]) {
        let player = this.player;
        if (player) {
          yarp.groups[group].leave(player);
          mp.events.call('characterLeftGroup',player,this,group);
        }
      }
      this.groups.splice(this.groups.indexOf(group), 1);
      return true;
    }
    return false;
  }

  /**
   * Get group by type.
   * @instance
   * @function getGroupByType
   * @memberof yarp.Character
   * @param {string} type - Group type.
   * @returns {string} - Group id.
   */
  getGroupByType(type){
    for (let id of this.groups) {
      let group = yarp.groups[id];
      if (group != null) {
        if (group.type == type){
          return id;
        }
      }
    }
  }

  /**
   * Get groups by types.
   * @instance
   * @function getGroupByTypes
   * @memberof yarp.Character
   * @param {Array<string>} type - Group types.
   * @returns {Array<string>} - Group ids.
   */
  getGroupsByTypes(types){
    let groups = [];
    for (let id of this.groups) {
      let group = yarp.groups[id];
      if (group != null) {
        if (types.indexOf(group.type) >= 0){
          groups.push(group);
        }
      }
    }
    return groups;
  }

  /**
   * Check if has group.
   * @instance
   * @function hasGroup
   * @memberof yarp.Character
   * @param {string} id - Group id.
   * @returns {boolean} - If has or not the group.
   */
  hasGroup(id){
   return (this.groups.indexOf(id) > -1);
  }

  /**
   * Check if has all groups.
   * @instance
   * @function hasGroup
   * @memberof yarp.Character
   * @param {Array<string>} id - Group ids.
   * @returns {boolean} - If has or not all the groups.
   */
  hasGroups(groups){
    for (let i = 0; i < groups.length; i++){
      if (!this.hasGroup(groups[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Give a job.
   * @instance
   * @function giveJob
   * @memberof yarp.Character
   * @param {string} job - Job id.
   * @returns {boolean} - Operation success/fail.
   * @fires characterJoinedJob
   */
  giveJob(job) {
    if (this.jobs.indexOf(job) == -1) {
      if (yarp.jobs[job]) {
        const type = yarp.jobs[job].type;
        if (type) {
          const same_type = this.getJobByType(type);
          if (same_type) {
            this.takeJob(same_type);
          }
        }
        const player = this.player;
        if (player) {
          yarp.jobs[job].enter(player);
          mp.events.call('characterJoinedJob', player, this, job);
        }
      }
      this.jobs.push(job);
      return true;
    }
    return false;
  }

  /**
   * Take a job.
   * @instance
   * @function takeJob
   * @memberof yarp.Character
   * @param {string} job - Job id.
   * @returns {boolean} - Operation success/fail.
   * @fires characterLeftJob
   */
  takeJob(job) {
    if (this.jobs.indexOf(job) > -1) {
      if (yarp.jobs[job]) {
        let player = this.player;
        if (player) {
          yarp.jobs[job].leave(player);
          mp.events.call('characterLeftJob', player, this, job);
        }
      }
      this.jobs.splice(this.jobs.indexOf(job), 1);
      return true;
    }
    return false;
  }

  /**
   * Get job by type.
   * @instance
   * @function getJobByType
   * @memberof yarp.Character
   * @param {string} type - Job type.
   * @returns {string} - Job id.
   */
  getJobByType(type){
    for (let id of this.jobs) {
      let job = yarp.jobs[id];
      if (job != null) {
        if (job.type == type) {
          return id;
        }
      }
    }
  }

  /**
   * Get jobs by types.
   * @instance
   * @function getJobByTypes
   * @memberof yarp.Character
   * @param {Array<string>} type - Job types.
   * @returns {Array<string>} - Job ids.
   */
  getJobsByTypes(types){
    let jobs = [];
    for (let id of this.jobs) {
      let job = yarp.jobs[id];
      if (job != null) {
        if (types.indexOf(job.type) >= 0) {
          jobs.push(job);
        }
      }
    }
    return jobs;
  }

  /**
   * Check if has job.
   * @instance
   * @function hasJob
   * @memberof yarp.Character
   * @param {string} id - Job id.
   * @returns {boolean} - If has or not the job.
   */
  hasJob(id) {
   return (this.jobs.indexOf(id) > -1);
  }


  /*
  * Check if player has the job class without level in ID
  */
  hasJobClass(id) {
    const jobs = this.jobs;
    for (let i = 0; i < jobs.length; i++) {
      let jobSplit = jobs[i].split("-");
      if (jobSplit[0] == id) {
        return true;
      }
    }
    return true;
  }

  /*
  * Return the job class of a Player
  */
  getJobClass(id) {
    const jobs = this.jobs;
    for (let i = 0; i < jobs.length; i++) {
      let jobSplit = jobs[i].split("-");
      if (jobSplit[0] == id) {
        return jobSplit[0];
      }
    }
    return false;
  }

  /**
   * Check if has all jobs.
   * @instance
   * @function hasJobs
   * @memberof yarp.Character
   * @param {Array<string>} id - Job ids.
   * @returns {boolean} - If has or not all the jobs.
   */
  hasJobs(jobs) {
    for (let i = 0; i < jobs.length; i++) {
      if (!this.hasJob(jobs[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if has permission.
   * @instance
   * @function hasPermission
   * @memberof yarp.Character
   * @param {string} permission - Permission.
   * @returns {boolean} - If has or not the permission.
   */
  hasPermission(permission){
    let result = false;
    let removed = false;
    let readd = false;
    if (permission[0] == '#') {
      let parts = permission.split('.');
      let item = this.inventory[parts[0].slice(1, parts[0].length)];
      let operation = parts[1][0];
      let value = Number(parts[1].slice(1,parts[1].length));
      switch(operation) {
        case '>':
        result = (item > value);
        break;
        case '<':
        result = (item < value);
        break;
        default:
        result = (item == value);
        break;
      }
    } else if (permission[0] == '@') {
      let parts = permission.split('.');
      let skill = this.skills[parts[0].slice(1, parts[0].length)];
      let operation = parts[1][0];
      let value = Number(parts[1].slice(1, parts[1].length));
      switch (operation) {
        case '>':
          result = (skill > value);
          break;
        case '<':
          result = (skill < value);
          break;
        default:
          result = (skill == value);
          break;
      }
    } else if (permission[0] == '$') {
      let parts = permission.split('.');
      let param = this[parts[0].slice(1, parts[0].length)];
      let operation = parts[1][0];
      let value = Number(parts[1].slice(1, parts[1].length));
      switch (operation) {
        case '>':
          result = (param > value);
          break;
        case '<':
          result = (param < value);
          break;
        default:
          result = (param == value);
          break;
      }
    } else {
      for (let id of this.groups) {
        let group = yarp.groups[id];
        if (group != null) {
          if (group.permissions.indexOf('*') > -1){
            result = true;
          }
          if (group.permissions.indexOf(permission) > -1){
            result = true;
          }
          if (group.permissions.indexOf(`-${permission}`) > -1){
            removed = true;
          }
          if (group.permissions.indexOf(`+${permission}`) > -1){
            readd = true;
          }
        }
      }
    }
    if (removed && !readd){
      result = false;
    }
    return result;
  }

  /**
   * Check if has all permissions.
   * @instance
   * @function hasPermission
   * @memberof yarp.Character
   * @param {Array<string>} permissions - Permissions.
   * @returns {boolean} - If has or not all permissions.
   */
  hasPermissions(permissions){
    for (let i = 0; i < permissions.length; i++){
      if (!this.hasPermission(permissions[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Increase hunger.
   * @instance
   * @function increaseHunger
   * @memberof yarp.Character
   * @param {number} value - Value to increase.
   */
  increaseHunger(value){
    let overflow = this.hunger+value-100;
    if (overflow > 0){
      this.health -= overflow;
    }
    this.hunger += value;
    if (this.hunger > 100) {
      this.hunger = 100;
    }
    this.player.setVariable('PLAYER_HUNGER', this.hunger);
  }

  /**
   * Increase thirst.
   * @instance
   * @function increaseThirst
   * @memberof yarp.Character
   * @param {number} value - Value to increase.
   */
  increaseThirst(value){
    let overflow = this.thirst+value-100;
    if (overflow > 0){
      this.health -= overflow;
    }
    this.thirst += value;
    if (this.thirst > 100) {
      this.thirst = 100;
    }
    this.player.setVariable('PLAYER_THIRST', this.thirst);
  }

  /**
   * Increase XP.
   * @instance
   * @function increaseXp
   * @memberof yarp.Character
   * @param {number} value - Value to increase.
   */
  increaseXp(value) {
    this.xp += value;
    if (this.xp > 1000000000) {
      this.xp = 1000000000;
    }
    this.player.setVariable('PLAYER_XP', this.xp);
  }

  /**
   * Decrease hunger.
   * @instance
   * @function decreaseHunger
   * @memberof yarp.Character
   * @param {number} value - Value to decrease.
   */
  decreaseHunger(value){
    let overflow = this.thirst-value;
    if (overflow < 0){
      this.health += overflow;
    }
    this.hunger -= value;
    if (this.hunger < 0) {
      this.hunger = 0;
    }
    this.player.setVariable('PLAYER_HUNGER', this.hunger);
  }

  /**
   * Decrease thirst.
   * @instance
   * @function decreaseThirst
   * @memberof yarp.Character
   * @param {number} value - Value to decrease.
   */
  decreaseThirst(value) {
    let overflow = this.thirst - value;
    if (overflow < 0) {
      this.health += overflow;
    }
    this.thirst -= value;
    if (this.thirst < 0) {
      this.thirst = 0;
    }
    this.player.setVariable('PLAYER_THIRST', this.thirst);
  }

  /**
   * Decrease XP.
   * @instance
   * @function decreaseXp
   * @memberof yarp.Character
   * @param {number} value - Value to decrease.
   */
  decreaseXp(value) {
    this.xp -= value;
    if (this.xp < 0) {
      this.xp = 0;
    }
    this.player.setVariable('PLAYER_XP', this.xp);
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Character
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Character(obj._id, obj._socialClub, obj._age, obj._model, obj._face, obj._lastLogin, obj._wallet, obj._bank, obj._dirtyMoney, obj._health, obj._armour, obj._hunger, obj._thirst, obj._xp, obj._cnh,obj._position,obj._heading,obj._groups,obj._jobs,obj._weapons,obj._skills,obj._weight,obj._inventory,obj._customization,obj._decoration,obj._clothes,obj._defaultClothes,obj._enter,obj._leave);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Character
   * @param {string} file - Config file path.
   */
  static config(file){
    let characters = require(file);
    for (let id in characters){
      let character = characters[id];
      if (yarp.characters[id]) {
        for (let group of character.groups){
          yarp.characters[id].giveGroup(group);
        }
        for (let job of character.jobs){
          yarp.characters[id].giveJob(job);
        }
        if (character.enter) {
          yarp.characters[id].enter = character.enter.toString();
        }
        if (character.leave) {
          yarp.characters[id].leave = character.leave.toString();
        }
      }
    }
  }
}

module.exports = Character;
