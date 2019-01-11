class EntityPool {
  constructor(entityClassName) {
    this.entityClassName = entityClassName;
    this._items = {};
  }

  add(item) {
    if (!item.constructor) {
      throw new Error(`Item does not have a constructor`);
    }
    if (item.constructor.name !== this.entityClassName) {
      throw new Error(`Can\t add item of type ${item.constructor.name} on EntityPool of class name ${this.entityClassName}`);
    }
    this._items[item.id] = item;
    return item;
  }

  remove(item) {
    delete this._items[item.id];
  }

  get(id) {
    return this._items[id];
  }

  get size() {
    return Object.keys(this._items).length;
  }

  forEach(func) {
    const keys = Object.keys(this._items);
    for (let i = 0, len = keys.length; i < len; i++) {
      func(this._items[keys[i]]);
    }
  }
}

module.exports = EntityPool;
