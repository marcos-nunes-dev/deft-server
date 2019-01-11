'use strict';
/**
 * Creates a Job.
 * @namespace yarp.Job
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Job id.
 * @param {string} [type=null] - Job type.
 * @param {function} [enter=() => {}] - Job enter function.
 * @param {function} [leave=() => {}] - Job leave function.
 * @param {Array<string>} [permissions=[]] - Door permissions.
 * @param {Array<string>} [items=[]] - Job items.
 */

class Job extends yarp.GMObject {
  constructor(id, level, label, salary, maxSize, type, permissions, enter, leave) {
    super();
    if (id != null) {
      this._id = id;
      this._level = level;
      this._label = label;
      this._salary = salary;
      this._maxSize = maxSize;
      this._type = type || null;
      this._permissions = ((permissions) ? (((yarp.groups && yarp.groups[id]) != null) ?
        yarp.groups[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.groups[id].permissions.indexOf(permission) < 0;
        })) : permissions) : []);
      this._enter = ((enter) ? enter.toString() : '() => {}');
      this._leave = ((leave) ? leave.toString() : '() => {}');
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Get users on job.
   * @instance
   * @function users
   * @memberof yarp.Job
   * @returns {object} - Users.
   */
  get users() {
    let users = {};
    for (id in yarp.users) {
      let user = yarp.users[id];
      if (user.hasJob(this.id)) {
        users[id] = user;
      }
    }
    return users;
  }

  /**
   * Get characters on job.
   * @instance
   * @function characters
   * @memberof yarp.Job
   * @returns {object} - Characters.
   */
  get characters() {
    let characters = {};
    for (id in yarp.characters) {
      let character = yarp.characters[id];
      if (character.hasJob(this.id)) {
        characters[id] = character;
      }
    }
    return characters;
  }

  /**
   * Add permission to job.
   * @instance
   * @function addPermission
   * @memberof yarp.Job
   * @param {string} permission - Permission.
   */
  addPermission(permission) {
    if (this.permissions.indexOf(permission) == -1) {
      this.permissions.push(permission);
    }
  }

  /**
   * Remove permission from job.
   * @instance
   * @function removePermission
   * @memberof yarp.Job
   * @param {string} permission - Permission.
   */
  removePermission(permission) {
    if (this.permissions.indexOf(permission) > -1) {
      this.permissions.splice(this.permissions.indexOf(permission), 1);
    }
  }

  /**
   * Check if has permission.
   * @instance
   * @function hasPermission
   * @memberof yarp.Job
   * @param {string} permission - Permission.
   * @returns {boolean} - If has or not the permission.
   */
  hasPermission(permission) {
    let result = false;
    let removed = false;
    let readd = false;
    if (this.permissions.indexOf('*') > -1) {
      result = true;
    }
    if (this.permissions.indexOf(permission) > -1) {
      result = true;
    }
    if (this.permissions.indexOf(`-${permission}`) > -1) {
      removed = true;
    }
    if (this.permissions.indexOf(`+${permission}`) > -1) {
      readd = true;
    }
    if (removed && !readd) {
      result = false;
    }
    return result;
  }

  /**
   * Check if has all permissions.
   * @instance
   * @function hasPermission
   * @memberof yarp.Job
   * @param {Array<string>} permissions - Permissions.
   * @returns {boolean} - If has or not all permissions.
   */
  hasPermissions(permissions) {
    for (let i = 0; i < permissions.length; i++) {
      if (!this.hasPermission(permissions[i])) {
        return false;
      }
    }
    return true;
  }


  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Job
   * @param {object} object - Class object.
   */
  static load(obj) {
    return new Job(obj._id, obj._level, obj._label, obj._salary, obj._maxSize, obj._type, obj._permissions, obj._enter, obj._leave);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Job
   * @param {string} file - Config file path.
   */
  static config(file) {
    let jobs = require(file);
    for (let id in jobs) {
      let job = jobs[id];
      new Job(id, job.level, job.label, job.salary, job.maxSize, job.type, job.permissions, job.enter, job.leave);
    }
  }
}

module.exports = Job;
